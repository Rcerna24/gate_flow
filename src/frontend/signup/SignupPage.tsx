import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield, MapPin, QrCode, Megaphone, Users, ClipboardList,
  Bell, Eye, EyeOff, Lock, Mail, UserRound, Phone, Hash,
  BookOpen, UserPlus, ChevronDown, AlertCircle, CheckCircle2,
} from 'lucide-react';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { signUp } from '@/backend/auth/authentication';

const features = [
  {
    icon: <QrCode size={17} />,
    label: 'QR Code Scanning',
    desc: 'Seamless ingress & egress tracking',
  },
  {
    icon: <Megaphone size={17} />,
    label: 'SOS Broadcast',
    desc: 'Instant campus-wide emergency alerts',
  },
  {
    icon: <Users size={17} />,
    label: 'Role-Based Access',
    desc: 'Permissions tailored per role',
  },
  {
    icon: <ClipboardList size={17} />,
    label: 'Entry Audit Logs',
    desc: 'Exportable, filterable activity trail',
  },
  {
    icon: <Bell size={17} />,
    label: 'Incident Reporting',
    desc: 'Structured reporting with status tracking',
  },
];

const ROLES = ['Student', 'Faculty', 'Staff'] as const;
type Role = (typeof ROLES)[number];

function getRoleBasedPath(role: string): string {
  switch (role) {
    case 'guard': return '/guard/';
    case 'admin': return '/admin/';
    default: return '/student/';
  }
}

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  // Form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [department, setDepartment] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<Role>('Student');

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Field-level errors
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  function validate(): Record<string, string> {
    const errs: Record<string, string> = {};
    if (!firstName.trim()) errs.firstName = 'First name is required.';
    if (!lastName.trim()) errs.lastName = 'Last name is required.';
    if (!idNumber.trim()) errs.idNumber = 'ID number is required.';
    if (!email.trim()) errs.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Enter a valid email.';
    if (!contact.trim()) errs.contact = 'Contact number is required.';
    else if (!/^09\d{9}$/.test(contact.trim())) errs.contact = 'Enter a valid PH number (09XXXXXXXXX).';
    if (!department.trim()) errs.department = role === 'Student' ? 'Course & year is required.' : 'Department is required.';
    if (!password) errs.password = 'Password is required.';
    else if (password.length < 8) errs.password = 'Password must be at least 8 characters.';
    if (!confirmPassword) errs.confirmPassword = 'Please confirm your password.';
    else if (password !== confirmPassword) errs.confirmPassword = 'Passwords do not match.';
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});
    setError(null);
    setLoading(true);
    try {
      const data = await signUp(email.trim(), password, {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        id_number: idNumber.trim(),
        role: role.toLowerCase(),
        contact: contact.trim(),
        department: department.trim(),
      });
      // If a session was returned, email confirmation is off — redirect immediately.
      if (data.session) {
        navigate(getRoleBasedPath(role.toLowerCase()), { replace: true });
      } else {
        // Email confirmation required — show success message.
        setSuccess(true);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left brand panel ─────────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-105 xl:w-115 shrink-0 bg-[#0d1117] text-white relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-white/3" />
          <div className="absolute -bottom-15 -right-15 w-64 h-64 rounded-full bg-white/3" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/1.5" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Shield size={21} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-[15px] leading-none tracking-tight">VSU Security</p>
                <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1">
                  Campus Security System
                </p>
              </div>
            </div>

            <Badge
              variant="outline"
              className="border-white/15 text-white/50 text-[11px] gap-1.5 mt-1"
            >
              <MapPin size={10} />
              Main Campus – Visayas State University
            </Badge>
          </div>

          {/* Hero copy */}
          <div className="mt-14">
            <h2 className="text-3xl font-bold leading-tight tracking-tight">
              Join the<br />Campus Network.
            </h2>
            <p className="mt-3 text-sm text-white/45 leading-relaxed max-w-xs">
              Create your account to access QR-based entry tracking, incident
              reporting, and emergency alerts — all from one place.
            </p>
          </div>

          {/* Feature list */}
          <div className="mt-10 space-y-5">
            {features.map((f, i) => (
              <div key={i} className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center shrink-0 mt-0.5 text-white/70">
                  {f.icon}
                </div>
                <div>
                  <p className="text-[13px] font-medium text-white/90">{f.label}</p>
                  <p className="text-[12px] text-white/35 mt-0.5">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-10 flex items-center justify-between">
            <p className="text-[11px] text-white/25">© 2026 VSU Security Department</p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <Badge
                variant="outline"
                className="border-white/15 text-white/35 text-[10px] py-0.5"
              >
                v1.0.0
              </Badge>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Right form panel ──────────────────────────────────────────── */}
      <main className="flex-1 flex items-center justify-center bg-slate-50 py-10 px-6 sm:px-12 overflow-y-auto">
        <div className="w-full max-w-105">
          {/* Mobile-only brand header */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
              <Shield size={15} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-[14px] text-slate-900 leading-none">VSU Security</p>
              <p className="text-slate-400 text-[10px] uppercase tracking-widest mt-0.5">Campus Portal</p>
            </div>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create an account</h1>
            <p className="text-slate-500 text-sm mt-1">
              Fill in your details to register as a VSU member
            </p>
          </div>

          <Card className="border-0 shadow-xl shadow-slate-200/80 rounded-2xl overflow-hidden">
            <CardContent className="px-5 pt-6 pb-5 space-y-4">

              {/* ── Success state ── */}
              {success ? (
                <div className="flex flex-col items-center gap-3 py-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 size={24} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">Account created!</p>
                    <p className="text-sm text-slate-500 mt-1">
                      Check your email at <span className="font-medium text-slate-700">{email}</span> to confirm your account before signing in.
                    </p>
                  </div>
                  <a
                    href="/login"
                    className="mt-2 text-sm font-medium text-slate-900 hover:underline underline-offset-2"
                  >
                    Go to Sign In →
                  </a>
                </div>
              ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>

              {/* ── Row: First Name + Last Name ── */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="firstname" className="text-xs font-medium text-slate-600">
                    First Name
                  </Label>
                  <div className="relative">
                    <UserRound size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <Input
                      id="firstname"
                      type="text"
                      placeholder="Juan"
                      className={`pl-8 h-9 text-sm ${fieldErrors.firstName ? 'border-red-400 focus-visible:ring-red-300' : ''}`}
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  {fieldErrors.firstName && <p className="text-[11px] text-red-500">{fieldErrors.firstName}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="lastname" className="text-xs font-medium text-slate-600">
                    Last Name
                  </Label>
                  <div className="relative">
                    <UserRound size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <Input
                      id="lastname"
                      type="text"
                      placeholder="dela Cruz"
                      className={`pl-8 h-9 text-sm ${fieldErrors.lastName ? 'border-red-400 focus-visible:ring-red-300' : ''}`}
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  {fieldErrors.lastName && <p className="text-[11px] text-red-500">{fieldErrors.lastName}</p>}
                </div>
              </div>

              {/* ID Number */}
              <div className="space-y-1.5">
                <Label htmlFor="idnumber" className="text-xs font-medium text-slate-600">
                  ID Number
                </Label>
                <div className="relative">
                  <Hash size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <Input
                    id="idnumber"
                    type="text"
                    placeholder="2024-XXXXX"
                    className={`pl-8 h-9 text-sm ${fieldErrors.idNumber ? 'border-red-400 focus-visible:ring-red-300' : ''}`}
                    value={idNumber}
                    onChange={(e) => setIdNumber(e.target.value)}
                  />
                </div>
                {fieldErrors.idNumber && <p className="text-[11px] text-red-500">{fieldErrors.idNumber}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-medium text-slate-600">
                  Institutional Email
                </Label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@vsu.edu.ph"
                    className={`pl-8 h-9 text-sm ${fieldErrors.email ? 'border-red-400 focus-visible:ring-red-300' : ''}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
                {fieldErrors.email && <p className="text-[11px] text-red-500">{fieldErrors.email}</p>}
              </div>

              {/* ── Row: Role + Contact ── */}
              <div className="grid grid-cols-2 gap-3">
                {/* Role */}
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-slate-600">Role</Label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setRoleOpen((o) => !o)}
                      className="w-full h-9 pl-8 pr-3 text-sm text-left border border-input rounded-md bg-background flex items-center justify-between shadow-xs focus:outline-none focus:ring-1 focus:ring-ring transition-colors hover:bg-slate-50"
                    >
                      <Users size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      <span className={role ? 'text-slate-900' : 'text-slate-400'}>{role || 'Select'}</span>
                      <ChevronDown size={13} className={`text-slate-400 transition-transform ${roleOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {roleOpen && (
                      <div className="absolute z-20 mt-1 w-full rounded-lg border border-slate-200 bg-white shadow-lg overflow-hidden">
                        {ROLES.map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => { setRole(r); setRoleOpen(false); }}
                            className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-slate-50 ${role === r ? 'font-medium text-slate-900' : 'text-slate-600'}`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Number */}
                <div className="space-y-1.5">
                  <Label htmlFor="contact" className="text-xs font-medium text-slate-600">
                    Contact Number
                  </Label>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <Input
                      id="contact"
                      type="tel"
                      placeholder="09XXXXXXXXX"
                      className={`pl-8 h-9 text-sm ${fieldErrors.contact ? 'border-red-400 focus-visible:ring-red-300' : ''}`}
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </div>
                  {fieldErrors.contact && <p className="text-[11px] text-red-500">{fieldErrors.contact}</p>}
                </div>
              </div>

              {/* Department / Course */}
              <div className="space-y-1.5">
                <Label htmlFor="department" className="text-xs font-medium text-slate-600">
                  {role === 'Student' ? 'Course & Year' : 'Department / Office'}
                </Label>
                <div className="relative">
                  <BookOpen size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <Input
                    id="department"
                    type="text"
                    placeholder={
                      role === 'Student'
                        ? 'e.g. BS Computer Science – 3rd Year'
                        : 'e.g. College of Engineering and Technology'
                    }
                    className={`pl-8 h-9 text-sm ${fieldErrors.department ? 'border-red-400 focus-visible:ring-red-300' : ''}`}
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                </div>
                {fieldErrors.department && <p className="text-[11px] text-red-500">{fieldErrors.department}</p>}
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 py-0.5">
                <div className="flex-1 h-px bg-slate-100" />
                <span className="text-[11px] text-slate-400 font-medium">Security</span>
                <div className="flex-1 h-px bg-slate-100" />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs font-medium text-slate-600">
                  Password
                </Label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 8 characters"
                    className={`pl-8 pr-9 h-9 text-sm ${fieldErrors.password ? 'border-red-400 focus-visible:ring-red-300' : ''}`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                {fieldErrors.password && <p className="text-[11px] text-red-500">{fieldErrors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <Label htmlFor="confirmPassword" className="text-xs font-medium text-slate-600">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <Input
                    id="confirmPassword"
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Re-enter your password"
                    className={`pl-8 pr-9 h-9 text-sm ${fieldErrors.confirmPassword ? 'border-red-400 focus-visible:ring-red-300' : ''}`}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                {fieldErrors.confirmPassword && <p className="text-[11px] text-red-500">{fieldErrors.confirmPassword}</p>}
              </div>

              {/* API error */}
              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-[12px] text-red-600">
                  <AlertCircle size={13} className="shrink-0" />
                  {error}
                </div>
              )}

              {/* Terms notice */}
              <p className="text-[11px] text-slate-400 leading-relaxed">
                By registering, you agree that your campus entry data may be recorded
                and monitored in accordance with VSU security policies.
              </p>

              {/* Submit */}
              <Button type="submit" disabled={loading} className="w-full h-9 gap-2 text-sm font-medium">
                {loading ? (
                  <>
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Creating account…
                  </>
                ) : (
                  <>
                    <UserPlus size={14} />
                    Create Account
                  </>
                )}
              </Button>

              </form>
              )}
            </CardContent>

            <CardFooter className="flex flex-col gap-3 px-5 pb-5 pt-0">
              <div className="flex items-center gap-1.5 text-[12px] text-slate-500">
                Already have an account?
                <a
                  href="/login"
                  className="text-slate-900 font-medium hover:underline underline-offset-2 transition-colors"
                >
                  Sign in
                </a>
              </div>
              <p className="text-[11px] text-center text-slate-400 w-full">
                © 2026 Visayas State University · Security Department
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;
