/**
 * @file ReportsPage.jsx — DigiFikile LMS Frontend
 * @layer Page
 *
 * Thin route screen: AppLayout + ReportsDashboard.
 */

import AppLayout from '../components/layout/AppLayout'
import { ReportsDashboard } from '../features/reports'

export default function ReportsPage() {
  return (
    <AppLayout section="Reports">
      <ReportsDashboard />
    </AppLayout>
  )
}
