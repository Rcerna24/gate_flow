import { supabase } from "../lib/supabase/client";

export interface SignUpMetadata {
  first_name: string;
  last_name: string;
  id_number: string;
  role: string;        // lowercase: 'student' | 'faculty' | 'staff'
  contact: string;
  department: string;
}

/** Maps role string to the DB enum value expected by the users table. */
function toDbRole(role: string): string {
  return role.toUpperCase(); // STUDENT | FACULTY | STAFF | GUARD | ADMIN
}

export async function signUp(email: string, password: string, metadata: SignUpMetadata) {
  // 1. Create the Supabase Auth account (stores metadata in user_metadata for routing)
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: metadata },
  });

  if (error) throw error;
  if (!data.user) throw new Error('Sign-up failed: no user returned.');

  // 2. Insert a row in the custom users table to match the DB schema
  const { error: dbError } = await supabase.from('users').insert({
    user_id: data.user.id,                       // match Supabase Auth UUID
    email: email.trim(),
    first_name: metadata.first_name,
    last_name: metadata.last_name,
    role: toDbRole(metadata.role),
    contact_number: metadata.contact || null,
  });

  if (dbError) throw new Error(dbError.message);

  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) throw error;

  // Fetch the user's role from the users table so routing is always DB-authoritative
  const { data: userRow, error: fetchError } = await supabase
    .from('users')
    .select('role, isActive, first_name, last_name')
    .eq('user_id', data.user.id)
    .single();

  if (fetchError) throw new Error(fetchError.message);
  if (!userRow?.isActive) throw new Error('Your account has been deactivated. Contact the administrator.');

  // Return merged result: auth data + db role for the caller to use in routing
  return {
    ...data,
    dbRole: (userRow.role as string).toLowerCase(), // e.g. 'student'
    displayName: `${userRow.first_name} ${userRow.last_name}`,
  };
}

export async function signout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}