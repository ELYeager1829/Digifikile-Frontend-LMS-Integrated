/**
 * @file StudentDashboardPage.jsx — DigiFikile LMS Frontend
 * @layer Page
 *
 * Thin route screen: AppLayout + LearnerDashboard.
 */

import AppLayout from '../components/layout/AppLayout'
import { LearnerDashboard } from '../features/dashboard'

export default function StudentDashboardPage() {
  return (
    <AppLayout section="Dashboard">
      <LearnerDashboard />
    </AppLayout>
  )
}
