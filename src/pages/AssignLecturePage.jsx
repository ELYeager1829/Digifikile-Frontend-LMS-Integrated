/**
 * @file AssignLecturePage.jsx — DigiFikile LMS Frontend
 * @layer Page
 *
 * WHAT THIS FILE IS:
 *   Thin route screen for assigning lectures (AppLayout + AssignLectureForm).
 */

import AppLayout from '../components/layout/AppLayout'
import { AssignLectureForm } from '../features/assessments'

export default function AssignLecturePage() {
  return (
    <AppLayout section="Assign Lectures">
      <AssignLectureForm />
    </AppLayout>
  )
}
