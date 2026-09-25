import { SystemAdminDashboard } from '../features/system-admin'
import { useEffect } from 'react'
import { useAuth } from '../features/auth/hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function SystemAdminDashboardPage() {
  const { role } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (role !== 'system-admin') navigate('/')
  }, [role, navigate])

  return <SystemAdminDashboard />
}
