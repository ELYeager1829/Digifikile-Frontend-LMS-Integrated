/**
 * @file AssessmentsPage.jsx — DigiFikile LMS Frontend
 * @layer Page
 *
 * WHAT THIS FILE IS:
 *   Thin route screen for learner quizzes (AppLayout + QuizList).
 */

import AppLayout from '../components/layout/AppLayout'
import { QuizList } from '../features/assessments'

export default function AssessmentsPage() {
  return (
    <AppLayout section="Quizzes">
      <QuizList />
    </AppLayout>
  )
}
