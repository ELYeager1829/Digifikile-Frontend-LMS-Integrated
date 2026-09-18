/**
 * @file SettingsPage.jsx — DigiFikile LMS Frontend
 * @layer Page
 *
 * Thin route screen: AppLayout + SettingsPanel.
 */

import AppLayout from '../components/layout/AppLayout'
import { SettingsPanel } from '../features/settings'

export default function SettingsPage() {
  return (
    <AppLayout section="Settings">
      <SettingsPanel />
    </AppLayout>
  )
}
