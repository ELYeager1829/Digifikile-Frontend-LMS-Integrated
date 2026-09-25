/**
 * @file DashboardOverview.jsx — DigiFikile LMS Frontend
 * @layer Feature Component
 *
 * Chooses Admin vs Learner dashboard from localStorage digifikile-role.
 */

import LearnerDashboard from './LearnerDashboard'
import AdminDashboard from './AdminDashboard'
import TrainingProviderDashboard from './TrainingProviderDashboard'

export default function DashboardOverview() {
  const role = typeof window !== 'undefined' ? localStorage.getItem('digifikile-role') : null

  if (role === 'student') {
    return <LearnerDashboard />
  }

  if (role === 'system-admin') {
    return null
  }

  if (role === 'training-provider' || role === 'provider' || role === 'facilitator') {
    return <TrainingProviderDashboard />
  }

  return <AdminDashboard />
}
