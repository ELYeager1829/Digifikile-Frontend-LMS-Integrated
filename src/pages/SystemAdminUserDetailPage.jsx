import { UserDetailContent } from './UserDetailPage'
import { ROUTES } from '../constants/routes'
import '../features/users/styles/user-management.css'

export default function SystemAdminUserDetailPage() {
  return <UserDetailContent backRoute={ROUTES.SYSTEM_ADMIN_USERS} />
}
