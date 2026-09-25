/**
 * @file api.js — DigiFikile LMS Frontend
 * @layer Constant
 *
 * WHAT THIS FILE IS:
 *   api.js is the shared immutable vocabulary for DigiFikile LMS. Its responsibility is intentionally narrow so a junior developer can locate routing, UI, state, HTTP, and pure transformations without guessing.
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
 *   api supports the DigiFikile learner, instructor, or administrator experience. The frontend is an untrusted client: it may improve usability and hide unavailable actions, but the .NET backend must still enforce every permission and business rule.
 *
 * @example
 *   // import { API } from '../constants/api'
 */

// Named constant export: import this source of truth instead of repeating the literal elsewhere.
export const ENDPOINTS = {
  AUTH: {
    SYSTEM_ADMIN_LOGIN: '/Auth/system-admin/login',
    SETA_ADMIN_LOGIN: '/Auth/admin/login',
    VERIFY_OTP: '/Auth/otp/verify',
    RESEND_OTP: '/Auth/otp/resend',
    FORGOT_PASSWORD: '/Auth/password/forgot',
    VERIFY_PASSWORD_RESET_OTP: '/Auth/password/reset/verify',
    RESET_PASSWORD: '/Auth/password/reset',
    CHANGE_PASSWORD: '/Auth/password/change',
    CURRENT_USER: '/Auth/me', 
    UPDATE_CURRENT_USER_PROFILE: '/Auth/me/profile',
  },
  SYSTEM_ADMIN: {
    SETA_ADMINS: '/system-admin/seta-admins',
    PROVISION_SETA_ADMIN: '/system-admin/seta-admin/provision',
    SETA_ADMIN_BY_ID: (adminId) => `/system-admin/seta-admin/${adminId}`,
    UPDATE_SETA_ADMIN: (adminId) => `/system-admin/seta-admin/${adminId}`,
    ACTIVATE_SETA_ADMIN: (adminId) => `/system-admin/seta-admin/${adminId}/activate`,
    DEACTIVATE_SETA_ADMIN: (adminId) => `/system-admin/seta-admin/${adminId}/deactivate`,
    DELETE_SETA_ADMIN: (adminId) => `/system-admin/seta-admin/${adminId}`,
  },
  COURSES: {
    LIST: '/courses',
    BY_ID: (courseId) => `/courses/${courseId}`,
    CREATE: '/courses',
    UPDATE: (courseId) => `/courses/${courseId}`,
    DELETE: (courseId) => `/courses/${courseId}`,
  },
  CONTENT: {
    MODULES: (courseId) => `/courses/${courseId}/modules`,
    MODULE_BY_ID: (courseId, moduleId) => `/courses/${courseId}/modules/${moduleId}`,
    LESSONS: (courseId, moduleId) => `/courses/${courseId}/modules/${moduleId}/lessons`,
    LESSON_BY_ID: (courseId, moduleId, lessonId) =>
      `/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`,
  },
  ASSESSMENTS: {
    LIST: '/assessments',
    BY_ID: (assessmentId) => `/assessments/${assessmentId}`,
    ATTEMPTS: (assessmentId) => `/assessments/${assessmentId}/attempts`,
    SUBMIT: (assessmentId) => `/assessments/${assessmentId}/submit`,
  },
  PROGRESS: {
    BY_USER: (userId) => `/progress/users/${userId}`,
    BY_COURSE: (courseId) => `/progress/courses/${courseId}`,
    COMPLETION: (courseId) => `/progress/courses/${courseId}/completion`,
  },
  REPORTS: {
    COMPLETION: (trainingProviderId) => `/Reports/completion/${trainingProviderId}`,
    ASSESSMENT_PERFORMANCE: (trainingProviderId) => `/Reports/assessment-performance/${trainingProviderId}`,
    COURSE_ANALYTICS: (courseId) => `/Reports/course-analytics/${courseId}`,
    USER_ACTIVITY: '/Reports/user-activity',
  },
  STUDENTS: {
    LIST: '/Students',
    BY_ID: (studentId) => `/Students/${studentId}`,
    CREATE: '/Students',
    UPDATE: (studentId) => `/Students/${studentId}`,
    DELETE: (studentId) => `/Students/${studentId}`,
  },
  GROUPS: {
    MINE: '/groups/my-groups',
    CREATE: '/groups',
    UPDATE: (groupId) => `/groups/${groupId}`,
    DELETE: (groupId) => `/groups/${groupId}`,
    STUDENTS: (groupId) => `/groups/${groupId}/students`,
    REMOVE_STUDENT: (groupId, studentId) => `/groups/${groupId}/students/${studentId}`,
  },
  USERS: {
    LIST: '/users',
    BY_ID: (userId) => `/users/${userId}`,
    CREATE: '/users',
    UPDATE: (userId) => `/users/${userId}`,
    DELETE: (userId) => `/users/${userId}`,
  },
  ROLES: {
    LIST: '/roles',
    BY_ID: (roleId) => `/roles/${roleId}`,
    ASSIGN: (userId) => `/users/${userId}/roles`,
    PERMISSIONS: (roleId) => `/roles/${roleId}/permissions`,
    ASSIGN_PERMISSION: (roleId, permissionId) => `/roles/${roleId}/permissions/${permissionId}`,
    REMOVE_PERMISSION: (roleId, permissionId) => `/roles/${roleId}/permissions/${permissionId}`,
  },
  PERMISSIONS: {
    LIST: '/permissions',
  },
  SYSTEM_LOGS: {
    LIST: '/system-logs',
    SEARCH: '/system-logs/search',
    EXPORT: '/system-logs/export',
  },
}
