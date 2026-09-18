import AppLayout from '../components/layout/AppLayout'
import { UserList } from '../features/users'
import { useLanguage } from '../i18n/LanguageContext'
import '../features/users/styles/user-management.css'

export default function UsersPage() {
  const { t } = useLanguage()
  return <AppLayout section={t('userManagement', 'title')}><div className="um-page"><UserList /></div></AppLayout>
}
