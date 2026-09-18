/**
 * @file ChangePasswordPage.jsx — DigiFikile LMS Frontend
 * @layer Page
 *
 * Thin route screen: AppLayout + ChangePasswordForm.
 */

import AppLayout from '../components/layout/AppLayout'
import { ChangePasswordForm } from '../features/settings'

export default function ChangePasswordPage() {
  return (
    <AppLayout section="Change Password">
      <ChangePasswordForm />
    </AppLayout>
  )
}
