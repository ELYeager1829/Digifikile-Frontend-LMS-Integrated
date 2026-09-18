/**
 * @file AddCoursePage.jsx — DigiFikile LMS Frontend
 * @layer Page
 *
 * Thin route screen: AppLayout + CourseForm.
 */

import AppLayout from '../components/layout/AppLayout'
import { CourseForm } from '../features/courses'

export default function AddCoursePage() {
  return (
    <AppLayout section="Courses">
      <CourseForm />
    </AppLayout>
  )
}
