/**
 * @file CourseCard.jsx — DigiFikile LMS Frontend
 * @layer Feature Component
 *
 * WHAT THIS FILE IS:
 *   CourseCard.jsx is the courses presentational UI for DigiFikile LMS. It belongs to the courses feature, which covers course discovery, course detail, enrolment, and instructor course management. Its responsibility is intentionally narrow so a junior developer can locate routing, UI, state, HTTP, and pure transformations without guessing.
 *
 * WHY THIS FOLDER:
 *   features/courses/components/ keeps UI that belongs only to the courses domain beside that domain. This preserves feature isolation and prevents shared folders from filling with one-off LMS screens.
 *
 * HOW TO CODE HERE (for juniors):
 *   - Keep this component as a mostly dumb view: receive data, callbacks, status flags, and labels through props; call a feature hook only at a clear container boundary.
 *   - Document the expected prop shape when implemented, validate optional values, and render stable keys when mapping DTO-derived collections.
 *   - Use semantic controls, associated labels, correct button types, keyboard support, and aria attributes only where native HTML does not express the meaning.
 *   - Use responsive Tailwind classes and content-driven sizing; avoid fixed widths that break on phones or translated copy.
 *   - Start by identifying this file’s single responsibility; split unrelated behaviour into the correct neighbouring layer.
 *   - Use named constants from constants/routes.js and constants/api.js instead of repeating URL or endpoint strings.
 *   - Represent loading, empty, error, and success states explicitly whenever asynchronous data reaches the UI.
 *
 * DO NOT:
 *   - Do not call raw Axios, import lib/api.js, mutate props, or hide side effects inside rendering.
 *   - Do not reach into another feature’s internal folders. A courses button must not directly issue another domain’s HTTP request; coordinate through page composition, a dedicated workflow hook, or approved public feature APIs.
 *   - Do not put passwords, API keys, signing secrets, database credentials, or trusted authorisation rules in frontend code; browser code is visible to users.
 *   - Do not hardcode route or API path strings when ROUTES or ENDPOINTS provides the value.
 *   - Do not mix several responsibilities merely because they are used by the same screen.
 *
 * RELATED FILES:
 *   - features/courses/hooks/* — supplies data, status, and callbacks.
 *   - features/courses/index.js — exposes approved components to pages.
 *   - services/* — reached through hooks, never imported directly here.
 *
 * DIGIFIKILE LMS CONTEXT:
 *   This module participates in course discovery, course detail, enrolment, and instructor course management. The .NET API remains authoritative for validation, permissions, persistence, and business rules. Frontend code presents those outcomes, sends DTO-shaped requests through services, and must handle ProblemDetails/validation failures without assuming the browser is trusted.
 *
 * @example
 *   // <CourseCard data={viewModel} loading={loading} error={error} onRetry={refetch} />
 */

// Default export: render this component through its owning page/feature; keep its props and UI responsibility focused.
export default function CourseCard() {
  return <div>TODO: Course card — title, description, link to detail</div>
}
