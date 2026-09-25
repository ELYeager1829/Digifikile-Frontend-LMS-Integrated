/**
 * @file index.js — DigiFikile LMS Frontend
 * @layer Feature Public API
 *
 * WHAT THIS FILE IS:
 *   Public barrel for the assessments feature.
 */

export { default as QuizList } from './components/QuizList'
export { default as AssignmentList } from './components/AssignmentList'
export { default as AssignLectureForm } from './components/AssignLectureForm'
export { default as AttemptForm } from './components/AttemptForm'
export { useAssessments } from './hooks/useAssessments'
export { useAttempts } from './hooks/useAttempts'
