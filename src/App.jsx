/**
 * @file App.jsx — DigiFikile LMS Frontend
 * @layer Bootstrap
 *
 * Application route composition for DigiFikile LMS.
 */

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { ROUTES } from './constants/routes'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import TwoFactorPage from './pages/TwoFactorPage'
import DashboardPage from './pages/DashboardPage'
import SystemAdminDashboardPage from './pages/SystemAdminDashboardPage'
import SystemAdminLayout from './features/system-admin/components/SystemAdminLayout'
import SystemAdminSetaAdministratorsPage from './pages/SystemAdminSetaAdministratorsPage'
import SystemAdminComplaintsPage from './pages/SystemAdminComplaintsPage'
import SystemAdminSystemLogPage from './pages/SystemAdminSystemLogPage'
import SystemAdminProfilePage from './pages/SystemAdminProfilePage'
import SystemAdminUsersPage from './pages/SystemAdminUsersPage'
import SystemAdminUserDetailPage from './pages/SystemAdminUserDetailPage'
import SystemAdminRolesPermissionsPage from './pages/SystemAdminRolesPermissionsPage'
import StudentDashboardPage from './pages/StudentDashboardPage'
import CoursesPage from './pages/CoursesPage'
import AddCoursePage from './pages/AddCoursePage'
import CourseDetailPage from './pages/CourseDetailPage'
import AssessmentsPage from './pages/AssessmentsPage'
import AssignmentsPage from './pages/AssignmentsPage'
import AssignLecturePage from './pages/AssignLecturePage'
import ModulesPage from './pages/ModulesPage'
import ModuleDetailPage from './pages/ModuleDetailPage'
import ProgressPage from './pages/ProgressPage'
import ReportsPage from './pages/ReportsPage'
import CourseReportsPage from './pages/CourseReportsPage'
import CertificateVerificationPage from './pages/CertificateVerificationPage'
import UsersPage from './pages/UsersPage'
import AddUserPage from './pages/AddUserPage'
import UserDetailPage from './pages/UserDetailPage'
import DepartmentsPage from './pages/DepartmentsPage'
import EnrollmentRequestsPage from './pages/EnrollmentRequestsPage'
import EnrollmentRequestDetailPage from './pages/EnrollmentRequestDetailPage'
import MessagesPage from './pages/MessagesPage'
import AnnouncementsPage from './pages/AnnouncementsPage'
import DownloadsPage from './pages/DownloadsPage'
import LearnerGroupsPage from './pages/LearnerGroupsPage'
import SettingsPage from './pages/SettingsPage'
import ProfileSettingsPage from './pages/ProfileSettingsPage'
import ChangePasswordPage from './pages/ChangePasswordPage'
import HelpPage from './pages/HelpPage'
import NotFoundPage from './pages/NotFoundPage'


function RequireRole({ children, roles }) {
  const authenticated = localStorage.getItem('digifikile-authenticated') === 'true'
  const role = localStorage.getItem('digifikile-role')
  const token = localStorage.getItem('token')

  if (!authenticated || !token) return <Navigate to={ROUTES.LOGIN} replace />
  if (!roles.includes(role)) {
    return <Navigate to={role === 'system-admin' ? ROUTES.SYSTEM_ADMIN_DASHBOARD : ROUTES.DASHBOARD} replace />
  }
  return children
}

function RequireSystemAdmin({ children }) {
  return <RequireRole roles={['system-admin']}>{children}</RequireRole>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.LOGIN} replace />} />
        <Route path="/sign-in" element={<Navigate to={ROUTES.LOGIN} replace />} />
        <Route path="/create-account" element={<Navigate to={ROUTES.REGISTER} replace />} />
        <Route path="/admin-sign-in" element={<Navigate to={ROUTES.LOGIN} replace />} />
        <Route path="/student-sign-in" element={<Navigate to={ROUTES.LOGIN} replace />} />
        <Route path="/quizzes" element={<Navigate to={ROUTES.ASSESSMENTS} replace />} />
        <Route path="/student-announcements" element={<Navigate to={ROUTES.ANNOUNCEMENTS} replace />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
        <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
        <Route path={ROUTES.TWO_FACTOR} element={<TwoFactorPage />} />

        <Route path={ROUTES.DASHBOARD} element={<RequireRole roles={['seta-admin', 'training-provider', 'provider', 'facilitator', 'moderator']}><DashboardPage /></RequireRole>} />
        <Route path="/system-admin" element={<RequireSystemAdmin><SystemAdminLayout /></RequireSystemAdmin>}>
          <Route index element={<SystemAdminDashboardPage />} />
          <Route path="seta-administrators" element={<SystemAdminSetaAdministratorsPage />} />
          <Route path="complaints" element={<SystemAdminComplaintsPage />} />
          <Route path="system-log" element={<SystemAdminSystemLogPage />} />
          <Route path="users" element={<SystemAdminUsersPage />} />
          <Route path="users/:userId" element={<SystemAdminUserDetailPage />} />
          <Route path="roles-permissions" element={<SystemAdminRolesPermissionsPage />} />
          <Route path="profile" element={/* system-admin profile (no AppLayout) */ <SystemAdminProfilePage />} />
        </Route>
        <Route path={ROUTES.STUDENT_DASHBOARD} element={<StudentDashboardPage />} />
        <Route path={ROUTES.DEPARTMENTS} element={<DepartmentsPage />} />
        <Route path={ROUTES.COURSES} element={<CoursesPage />} />
        <Route path={ROUTES.COURSE_ADD} element={<AddCoursePage />} />
        <Route path={ROUTES.COURSE_DETAIL()} element={<CourseDetailPage />} />
        <Route path={ROUTES.ASSESSMENTS} element={<AssessmentsPage />} />
        <Route path={ROUTES.ASSIGNMENTS} element={<AssignmentsPage />} />
        <Route path={ROUTES.ASSIGN_LECTURE} element={<AssignLecturePage />} />
        <Route path={ROUTES.MODULES} element={<ModulesPage />} />
        <Route path={ROUTES.MODULE_DETAIL()} element={<ModuleDetailPage />} />
        <Route path={ROUTES.PROGRESS} element={<ProgressPage />} />
        <Route path={ROUTES.REPORTS} element={<RequireRole roles={['seta-admin', 'training-provider', 'provider']}><ReportsPage /></RequireRole>} />
        <Route path={ROUTES.CERTIFICATE_VERIFICATION} element={<CertificateVerificationPage />} />
        <Route path={ROUTES.USERS} element={<RequireRole roles={['seta-admin']}><UsersPage /></RequireRole>} />
        <Route path={ROUTES.USER_ADD} element={<RequireRole roles={['seta-admin']}><AddUserPage /></RequireRole>} />
        <Route path={ROUTES.USER_DETAIL()} element={<RequireRole roles={['seta-admin']}><UserDetailPage /></RequireRole>} />
        <Route path={ROUTES.ENROLLMENT_REQUESTS} element={<EnrollmentRequestsPage />} />
        <Route path={ROUTES.ENROLLMENT_REQUEST_DETAIL()} element={<EnrollmentRequestDetailPage />} />
        <Route path={ROUTES.MESSAGES} element={<MessagesPage />} />
        <Route path={ROUTES.ANNOUNCEMENTS} element={<AnnouncementsPage />} />
        <Route path={ROUTES.DOWNLOADS} element={<DownloadsPage />} />
        <Route path={ROUTES.LEARNER_GROUPS} element={<RequireRole roles={['seta-admin']}><LearnerGroupsPage /></RequireRole>} />
        <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
        <Route path={ROUTES.PROFILE_SETTINGS} element={<RequireRole roles={['seta-admin', 'student', 'training-provider', 'provider', 'facilitator', 'moderator']}><ProfileSettingsPage /></RequireRole>} />
        <Route path={ROUTES.CHANGE_PASSWORD} element={<RequireRole roles={['seta-admin', 'student', 'system-admin', 'training-provider', 'provider', 'facilitator', 'moderator']}><ChangePasswordPage /></RequireRole>} />
        <Route path={ROUTES.HELP} element={<HelpPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
