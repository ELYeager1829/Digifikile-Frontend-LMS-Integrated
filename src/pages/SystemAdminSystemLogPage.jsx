import { Navigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import SystemAdminSystemLog from '../features/system-admin/components/SystemAdminSystemLog'

export default function SystemAdminSystemLogPage() {
  if (localStorage.getItem('digifikile-authenticated') !== 'true') return <Navigate to={ROUTES.LOGIN} replace />
  if (localStorage.getItem('digifikile-role') !== 'system-admin') return <section role="alert"><h1>Access restricted</h1><p>System logs are available to System Administrators only.</p></section>
  return <SystemAdminSystemLog />
}
