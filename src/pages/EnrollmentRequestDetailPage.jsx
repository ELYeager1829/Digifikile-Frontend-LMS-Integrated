/**
 * @file EnrollmentRequestDetailPage.jsx — DigiFikile LMS Frontend
 * @layer Page
 *
 * WHAT THIS FILE IS:
 *   Thin route screen for a single enrollment request (`requestId` param).
 *
 * RELATED FILES:
 *   - features/enrollment — EnrollmentRequestDetail
 *   - constants/routes.js — ROUTES.ENROLLMENT_REQUEST_DETAIL
 */

import AppLayout from '../components/layout/AppLayout'
import { EnrollmentRequestDetail } from '../features/enrollment'

export default function EnrollmentRequestDetailPage() {
  return (
    <AppLayout section="Enrollment Requests">
      <EnrollmentRequestDetail />
    </AppLayout>
  )
}
