/**
 * @file DashboardPage.jsx — DigiFikile LMS Frontend
 * @layer Page
 *
 * Thin route screen: AppLayout + DashboardOverview.
 */

import AppLayout from '../components/layout/AppLayout'
import { DashboardOverview } from '../features/dashboard'

export default function DashboardPage() {
  return (
    <AppLayout section="Dashboard">
      <DashboardOverview />
    </AppLayout>
  )
}
