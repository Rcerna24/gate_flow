import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import type { Session } from '@supabase/supabase-js';

import { supabase } from './backend/lib/supabase/client';

/** Session time limit in milliseconds (1 minute). */
const SESSION_TIMEOUT_MS = 60_000;

import LoginPage from './frontend/login/LoginPage';
import SignupPage from './frontend/signup/SignupPage';
import GuardDashboardPage from './frontend/guard/GuardDashboardPage';
import GuardScannerPage from './frontend/guard/scanner/GuardScannerPage';
import GuardLogPage from './frontend/guard/logs/GuardLogPage';
import GuardIncidentReportsPage from './frontend/guard/incident-reports/GuardIncidentReportsPage';
import GuardSOSPage from './frontend/guard/sos/GuardSOSPage';
import GuardVisitorApprovalPage from './frontend/guard/visitors/GuardVisitorApprovalPage';
import StudentDashboardPage from './frontend/student/StudentDashboardPage';
import StudentLogHistoryPage from './frontend/student/log-history/StudentLogHistoryPage';
import StudentProfilePage from './frontend/student/profile/StudentProfilePage';
import StudentEmergencyAlertsPage from './frontend/student/emergency-alerts/StudentEmergencyAlertsPage';
import StudentIncidentReportPage from './frontend/student/incident-report/StudentIncidentReportPage';
import StudentQRCodePage from './frontend/student/qr-code/StudentQRCodePage';
import AdminDashboardPage from './frontend/admin/AdminDashboardPage';
import AdminUserManagementPage from './frontend/admin/user-management/AdminUserManagementPage';

/** Redirects to /login when there is no active session. */
function ProtectedRoute({ session, children }: { session: Session | null; children: React.ReactNode }) {
  if (!session) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

/** Returns the default landing path for each role stored in user metadata. */
function getRoleBasedPath(role?: string): string {
  switch (role) {
    case 'guard': return '/guard/';
    case 'admin': return '/admin/';
    default: return '/student/';
  }
}

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Clears any existing timeout timer. */
  function clearSessionTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  /** Starts a countdown; signs the user out when SESSION_TIMEOUT_MS elapses. */
  function startSessionTimeout() {
    clearSessionTimeout();
    timeoutRef.current = setTimeout(async () => {
      await supabase.auth.signOut();
    }, SESSION_TIMEOUT_MS);
  }

  useEffect(() => {
    // Hydrate session on first load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (session) startSessionTimeout();
    });

    // Keep session in sync across tabs / token refreshes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        startSessionTimeout();   // reset timer on every new sign-in
      } else {
        clearSessionTimeout();   // user signed out — cancel any pending timer
      }
    });

    return () => {
      subscription.unsubscribe();
      clearSessionTimeout();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <span className="w-6 h-6 rounded-full border-2 border-slate-300 border-t-slate-700 animate-spin" />
      </div>
    );
  }

  const role = session?.user?.user_metadata?.role as string | undefined;

  return (
    <Router>
      <Routes>
        {/* Public routes – redirect to dashboard if already signed in */}
        <Route path="/" element={<Navigate to={session ? getRoleBasedPath(role) : '/login'} replace />} />
        <Route path="/login" element={session ? <Navigate to={getRoleBasedPath(role)} replace /> : <LoginPage />} />
        <Route path="/signup" element={session ? <Navigate to={getRoleBasedPath(role)} replace /> : <SignupPage />} />

        {/* Guard routes */}
        <Route path="/guard/" element={<ProtectedRoute session={session}><GuardDashboardPage /></ProtectedRoute>} />
        <Route path="/guard/scanner" element={<ProtectedRoute session={session}><GuardScannerPage /></ProtectedRoute>} />
        <Route path="/guard/logs" element={<ProtectedRoute session={session}><GuardLogPage /></ProtectedRoute>} />
        <Route path="/guard/visitors" element={<ProtectedRoute session={session}><GuardVisitorApprovalPage /></ProtectedRoute>} />
        <Route path="/guard/incidents" element={<ProtectedRoute session={session}><GuardIncidentReportsPage /></ProtectedRoute>} />
        <Route path="/guard/sos" element={<ProtectedRoute session={session}><GuardSOSPage /></ProtectedRoute>} />

        {/* Student routes */}
        <Route path="/student/" element={<ProtectedRoute session={session}><StudentDashboardPage /></ProtectedRoute>} />
        <Route path="/student/qr" element={<ProtectedRoute session={session}><StudentQRCodePage /></ProtectedRoute>} />
        <Route path="/student/history" element={<ProtectedRoute session={session}><StudentLogHistoryPage /></ProtectedRoute>} />
        <Route path="/student/profile" element={<ProtectedRoute session={session}><StudentProfilePage /></ProtectedRoute>} />
        <Route path="/student/alerts" element={<ProtectedRoute session={session}><StudentEmergencyAlertsPage /></ProtectedRoute>} />
        <Route path="/student/incidents" element={<ProtectedRoute session={session}><StudentIncidentReportPage /></ProtectedRoute>} />

        {/* Admin routes */}
        <Route path="/admin/" element={<ProtectedRoute session={session}><AdminDashboardPage /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute session={session}><AdminUserManagementPage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
    