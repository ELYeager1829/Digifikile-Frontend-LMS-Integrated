/**
 * @file AssignmentsPage.jsx — DigiFikile LMS Frontend
 * @layer Page
 *
 * WHAT THIS FILE IS:
 *   Thin route screen for learner assignments (AppLayout + AssignmentList).
 */

import AppLayout from '../components/layout/AppLayout'
import { AssignmentList } from '../features/assessments'

export default function AssignmentsPage() {
  return (
    <AppLayout section="Assignments">
      <AssignmentList />
    </AppLayout>
  )
}
