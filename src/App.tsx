import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from './frontend/login/LoginPage';
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
import SignupPage from './frontend/signup/SignupPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/guard/" element={<GuardDashboardPage />} />
        <Route path="/guard/scanner" element={<GuardScannerPage />} />
        <Route path="/guard/logs" element={<GuardLogPage />} />
        <Route path="/guard/visitors" element={<GuardVisitorApprovalPage />} />
        <Route path="/guard/incidents" element={<GuardIncidentReportsPage />} />
        <Route path="/guard/sos" element={<GuardSOSPage />} />
        <Route path="/student/" element={<StudentDashboardPage />} />
        <Route path="/student/qr" element={<StudentQRCodePage />} />
        <Route path="/student/history" element={<StudentLogHistoryPage />} />
        <Route path="/student/profile" element={<StudentProfilePage />} />
        <Route path="/student/alerts" element={<StudentEmergencyAlertsPage />} />
        <Route path="/student/incidents" element={<StudentIncidentReportPage />} />
        <Route path="/admin/" element={<AdminDashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;
    