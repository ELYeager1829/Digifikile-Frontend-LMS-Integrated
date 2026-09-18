/**
 * @file ProfileSettingsPage.jsx — DigiFikile LMS Frontend
 * @layer Page
 *
 * Thin route screen: AppLayout + ProfileSettingsPanel.
 */

import AppLayout from '../components/layout/AppLayout'
import { ProfileSettingsPanel } from '../features/settings'

export default function ProfileSettingsPage() {
  return (
    <AppLayout section="Profile Setting">
      <ProfileSettingsPanel />
    </AppLayout>
  )
}
