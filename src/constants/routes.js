/**
 * @file routes.js — DigiFikile LMS Frontend
 * @layer Constant
 *
 * WHAT THIS FILE IS:
 *   routes.js is the shared immutable vocabulary for DigiFikile LMS. Its responsibility is intentionally narrow so a junior developer can locate routing, UI, state, HTTP, and pure transformations without guessing.
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
 *   routes supports the DigiFikile learner, instructor, or administrator experience. The frontend is an untrusted client: it may improve usability and hide unavailable actions, but the .NET backend must still enforce every permission and business rule.
 *
 * @example
 *   // import { ROUTES } from '../constants/routes'
 */

// Named constant export: import this source of truth instead of repeating the literal elsewhere.
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  TWO_FACTOR: '/two-factor',
  DASHBOARD: '/dashboard',
  SYSTEM_ADMIN_DASHBOARD: '/system-admin',
  SYSTEM_ADMIN_SETA_ADMINISTRATORS: '/system-admin/seta-administrators',
  SYSTEM_ADMIN_COMPLAINTS: '/system-admin/complaints',
  SYSTEM_ADMIN_SYSTEM_LOG: '/system-admin/system-log',
  SYSTEM_ADMIN_USERS: '/system-admin/users',
  SYSTEM_ADMIN_USER_DETAIL: (userId = ':userId') => `/system-admin/users/${userId}`,
  SYSTEM_ADMIN_ROLES_PERMISSIONS: '/system-admin/roles-permissions',
  STUDENT_DASHBOARD: '/student-dashboard',
  DEPARTMENTS: '/departments',
  TRAINING_PROVIDERS: '/training-providers',
  COURSES: '/courses',
  COURSE_ADD: '/courses/add',
  COURSE_DETAIL: (courseId = ':courseId') => `/courses/${courseId}`,
  ASSESSMENTS: '/assessments',
  ASSIGNMENTS: '/assignments',
  ASSIGN_LECTURE: '/assign-lecture',
  PROGRESS: '/progress',
  REPORTS: '/reports',
  CERTIFICATE_VERIFICATION: '/certificate-verification',
  MESSAGES: '/messages',
  ENROLLMENT_REQUESTS: '/enrollment-requests',
  ENROLLMENT_REQUEST_DETAIL: (requestId = ':requestId') => `/enrollment-requests/${requestId}`,
  ANNOUNCEMENTS: '/announcements',
  DOWNLOADS: '/downloads',
  MODULES: '/modules',
  MODULE_DETAIL: (moduleId = ':moduleId') => `/modules/${moduleId}`,
  LEARNER_GROUPS: '/learner-groups',
  SETTINGS: '/settings',
  PROFILE_SETTINGS: '/profile-settings',
  CHANGE_PASSWORD: '/change-password',
  HELP: '/help',
  USERS: '/users',
  USER_ADD: '/users/add',
  USER_DETAIL: (userId = ':userId') => `/users/${userId}`,
  NOT_FOUND: '*',
}
