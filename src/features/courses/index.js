/**
 * @file index.js — DigiFikile LMS Frontend
 * @layer Feature Public API
 *
 * WHAT THIS FILE IS:
 *   index.js is the courses feature barrel for DigiFikile LMS. It belongs to the courses feature, which covers course discovery, course detail, enrolment, and instructor course management. Its responsibility is intentionally narrow so a junior developer can locate routing, UI, state, HTTP, and pure transformations without guessing.
 *
 * WHY THIS FOLDER:
 *   features/courses/index.js is the feature's public boundary. Pages and other approved consumers import from this barrel so internal component/hook paths can change without widespread import edits.
 *
 * HOW TO CODE HERE (for juniors):
 *   - Export only the components and hooks intentionally supported outside this feature.
 *   - Prefer named re-exports so imports are discoverable and tree-shaking remains straightforward.
 *   - Keep private helpers private; adding an export is an architectural decision because it becomes part of the feature contract.
 *   - Start by identifying this file’s single responsibility; split unrelated behaviour into the correct neighbouring layer.
 *   - Use named constants from constants/routes.js and constants/api.js instead of repeating URL or endpoint strings.
 *   - Represent loading, empty, error, and success states explicitly whenever asynchronous data reaches the UI.
 *
 * DO NOT:
 *   - Do not export every internal file “for convenience” or add runtime logic to the barrel.
 *   - Do not put passwords, API keys, signing secrets, database credentials, or trusted authorisation rules in frontend code; browser code is visible to users.
 *   - Do not hardcode route or API path strings when ROUTES or ENDPOINTS provides the value.
 *   - Do not mix several responsibilities merely because they are used by the same screen.
 *
 * RELATED FILES:
 *   - features/courses/components/* and hooks/* — internal modules selectively re-exported here.
 *   - pages/* — primary consumers of the public feature API.
 *
 * DIGIFIKILE LMS CONTEXT:
 *   This module participates in course discovery, course detail, enrolment, and instructor course management. The .NET API remains authoritative for validation, permissions, persistence, and business rules. Frontend code presents those outcomes, sends DTO-shaped requests through services, and must handle ProblemDetails/validation failures without assuming the browser is trusted.
 *
 * @example
 *   // import { SomeCoursesComponent } from '../features/courses'
 */

// Public feature exports: consumers use this stable boundary instead of importing courses internals directly.
export { default as CourseCatalog } from './components/CourseCatalog'
// Public feature exports: consumers use this stable boundary instead of importing courses internals directly.
export { default as CourseCard } from './components/CourseCard'
// Public feature exports: consumers use this stable boundary instead of importing courses internals directly.
export { default as CourseForm } from './components/CourseForm'
// Public feature exports: consumers use this stable boundary instead of importing courses internals directly.
export { default as CourseDetail } from './components/CourseDetail'
// Public feature exports: consumers use this stable boundary instead of importing courses internals directly.
export { useCourses } from './hooks/useCourses'
// Public feature exports: consumers use this stable boundary instead of importing courses internals directly.
export { useCourse } from './hooks/useCourse'
