/**
 * @file ProgressPage.jsx — DigiFikile LMS Frontend
 * @layer Page
 *
 * Thin route screen: AppLayout + ProgressOverview.
 */

import AppLayout from '../components/layout/AppLayout'
import { ProgressOverview } from '../features/progress'

export default function ProgressPage() {
  return (
    <AppLayout section="Progress">
      <ProgressOverview />
    </AppLayout>
  )
}
