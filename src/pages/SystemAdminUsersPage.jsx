import UserList from '../features/users/components/UserList'
import { ROUTES } from '../constants/routes'
import '../features/users/styles/user-management.css'

export default function SystemAdminUsersPage() {
  return <div className="um-page"><UserList detailRoute={ROUTES.SYSTEM_ADMIN_USER_DETAIL} showAddUser={false} /></div>
}
