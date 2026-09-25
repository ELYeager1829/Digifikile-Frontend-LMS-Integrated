/**
 * @file CoursesPage.jsx — DigiFikile LMS Frontend
 * @layer Page
 *
 * Thin route screen: AppLayout + CourseCatalog.
 */

import AppLayout from '../components/layout/AppLayout'
import { CourseCatalog } from '../features/courses'

export default function CoursesPage() {
  return (
    <AppLayout section="Courses">
      <CourseCatalog />
    </AppLayout>
  )
}
