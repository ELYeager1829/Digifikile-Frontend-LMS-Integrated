/**
 * @file CourseDetailPage.jsx — DigiFikile LMS Frontend
 * @layer Page
 */

import { useParams } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import { CourseDetail } from '../features/courses'

export default function CourseDetailPage() {
  const { courseId } = useParams()

  return (
    <AppLayout section="Course">
      <CourseDetail courseId={courseId} />
    </AppLayout>
  )
}
