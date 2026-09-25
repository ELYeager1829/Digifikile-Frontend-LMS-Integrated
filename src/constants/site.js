/**
 * @file site.js — DigiFikile LMS Frontend
 * @layer Constant
 *
 * WHAT THIS FILE IS:
 *   site.js is the shared immutable vocabulary for DigiFikile LMS. Its responsibility is intentionally narrow so a junior developer can locate routing, UI, state, HTTP, and pure transformations without guessing.
 *
 * WHY THIS FOLDER:
 *   constants/ gives routes, endpoint paths, and site copy one authoritative name. Centralising these values prevents spelling drift and makes backend route changes reviewable in one place.
 *
 * HOW TO CODE HERE (for juniors):
 *   - Use frozen/read-only-style objects with descriptive UPPER_SNAKE_CASE keys and values that exactly match React Router or .NET controller routes.
 *   - Group related constants without mixing computed state or environment secrets into this module.
 *   - Update consumers to import the named constant instead of creating a second source of truth.
 *   - Start by identifying this file’s single responsibility; split unrelated behaviour into the correct neighbouring layer.
 *   - Use named constants from constants/routes.js and constants/api.js instead of repeating URL or endpoint strings.
 *   - Represent loading, empty, error, and success states explicitly whenever asynchronous data reaches the UI.
 *
 * DO NOT:
 *   - Do not perform network calls, read mutable component state, or hide business logic in a constants module.
 *   - Do not put passwords, API keys, signing secrets, database credentials, or trusted authorisation rules in frontend code; browser code is visible to users.
 *   - Do not hardcode route or API path strings when ROUTES or ENDPOINTS provides the value.
 *   - Do not mix several responsibilities merely because they are used by the same screen.
 *
 * RELATED FILES:
 *   - App.jsx and pages/* — consume route constants.
 *   - services/* and lib/api.js — consume endpoint/environment-related constants.
 *
 * DIGIFIKILE LMS CONTEXT:
 *   site supports the DigiFikile learner, instructor, or administrator experience. The frontend is an untrusted client: it may improve usability and hide unavailable actions, but the .NET backend must still enforce every permission and business rule.
 *
 * @example
 *   // import { SITE } from '../constants/site'
 */

import { ROUTES } from './routes'

// Named constant export: import this source of truth instead of repeating the literal elsewhere.
export const SITE = {
  name: 'DigiFikile LMS',
  tagline: 'Manage Learning. Empower Learners.',
  copyright: `© ${new Date().getFullYear()} DigiFikile LMS.`,
}

// Named constant export: import this source of truth instead of repeating the literal elsewhere.
export const NAV_LINKS = [
  { label: 'Home', path: ROUTES.HOME },
  { label: 'Login', path: ROUTES.LOGIN },
  { label: 'Register', path: ROUTES.REGISTER },
]

// Named constant export: import this source of truth instead of repeating the literal elsewhere.
export const ADMIN_SIDEBAR_LINKS = [
  { label: 'Dashboard', path: ROUTES.DASHBOARD },
  { label: 'Departments', path: ROUTES.DEPARTMENTS },
  { label: 'Courses', path: ROUTES.COURSE_ADD },
  { label: 'Modules', path: ROUTES.MODULES },
  { label: 'Lectures', path: ROUTES.ASSIGNMENTS },
  { label: 'Assign Lectures', path: ROUTES.ASSIGN_LECTURE },
  { label: 'Reports', path: ROUTES.REPORTS },
  { label: 'Announcements', path: ROUTES.ANNOUNCEMENTS },
  { label: 'Enrollment Requests', path: ROUTES.ENROLLMENT_REQUESTS },
]

// Named constant export: import this source of truth instead of repeating the literal elsewhere.
export const STUDENT_SIDEBAR_LINKS = [
  { label: 'Dashboard', path: ROUTES.STUDENT_DASHBOARD },
  { label: 'Modules', path: ROUTES.MODULES },
  { label: 'Quizzes', path: ROUTES.ASSESSMENTS },
  { label: 'Assignments', path: ROUTES.ASSIGNMENTS },
  { label: 'Progress', path: ROUTES.PROGRESS },
  { label: 'Messages', path: ROUTES.MESSAGES },
  { label: 'Announcements', path: ROUTES.ANNOUNCEMENTS },
  { label: 'Downloads', path: ROUTES.DOWNLOADS },
]

/** @deprecated Prefer ADMIN_SIDEBAR_LINKS / STUDENT_SIDEBAR_LINKS */
export const SIDEBAR_LINKS = ADMIN_SIDEBAR_LINKS
