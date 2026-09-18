import SystemAdminSetaAdministrators from '../features/system-admin/components/SystemAdminSetaAdministrators'
import { useEffect } from 'react'
import { useAuth } from '../features/auth/hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function SystemAdminSetaAdministratorsPage() {
  const { role } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (role !== 'system-admin') {
      navigate('/')
    }
  }, [role, navigate])

  return <SystemAdminSetaAdministrators />
}
