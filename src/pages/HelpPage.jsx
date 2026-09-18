/**
 * @file HelpPage.jsx — DigiFikile LMS Frontend
 * @layer Page
 *
 * Thin route screen: AppLayout + HelpPanel.
 */

import AppLayout from '../components/layout/AppLayout'
import { HelpPanel } from '../features/help'

export default function HelpPage() {
  return (
    <AppLayout section="Help">
      <HelpPanel />
    </AppLayout>
  )
}
