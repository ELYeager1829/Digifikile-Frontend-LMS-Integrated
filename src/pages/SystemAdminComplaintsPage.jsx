import { Navigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import SystemAdminComplaints from '../features/system-admin/components/SystemAdminComplaints'

export default function SystemAdminComplaintsPage() {
  if (localStorage.getItem('digifikile-authenticated') !== 'true') {
    return <Navigate to={ROUTES.LOGIN} replace />
  }
  if (localStorage.getItem('digifikile-role') !== 'system-admin') {
    return <section role="alert"><h1>Access restricted</h1><p>Complaints management is available to System Administrators only.</p></section>
  }
  return <SystemAdminComplaints demo={!localStorage.getItem('token')} />
}
