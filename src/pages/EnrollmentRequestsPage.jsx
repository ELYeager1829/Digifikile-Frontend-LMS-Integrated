/**
 * @file EnrollmentRequestsPage.jsx — DigiFikile LMS Frontend
 * @layer Page
 *
 * WHAT THIS FILE IS:
 *   Thin route screen for enrollment request list.
 *
 * RELATED FILES:
 *   - features/enrollment — EnrollmentRequestList
 *   - constants/routes.js — ROUTES.ENROLLMENT_REQUESTS
 */

import AppLayout from '../components/layout/AppLayout'
import { EnrollmentRequestList } from '../features/enrollment'

export default function EnrollmentRequestsPage() {
  return (
    <AppLayout section="Enrollment Requests">
      <EnrollmentRequestList />
    </AppLayout>
  )
}
