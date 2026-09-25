/**
 * @file useCourse.js — DigiFikile LMS Frontend
 * @layer Feature Hook
 *
 * WHAT THIS FILE IS:
 *   useCourse.js is the courses data/state hook for DigiFikile LMS. It belongs to the courses feature, which covers course discovery, course detail, enrolment, and instructor course management. Its responsibility is intentionally narrow so a junior developer can locate routing, UI, state, HTTP, and pure transformations without guessing.
 *
 * WHY THIS FOLDER:
 *   features/courses/hooks/ owns React-side orchestration for the courses domain. Components consume this hook instead of knowing how HTTP, loading state, errors, and refetching work.
 *
 * HOW TO CODE HERE (for juniors):
 *   - Call only courses-appropriate service functions, own side effects in useEffect/event callbacks, and expose a small object such as { data, loading, error, refetch }.
 *   - Cancel or ignore stale requests when dependencies change, avoid state updates after unmount, and keep hook dependencies accurate.
 *   - Map backend DTO fields to stable view models here when the mapping is presentation-oriented; keep raw HTTP response shapes out of deep JSX.
 *   - Start by identifying this file’s single responsibility; split unrelated behaviour into the correct neighbouring layer.
 *   - Use named constants from constants/routes.js and constants/api.js instead of repeating URL or endpoint strings.
 *   - Represent loading, empty, error, and success states explicitly whenever asynchronous data reaches the UI.
 *
 * DO NOT:
 *   - Do not render JSX, manipulate the DOM directly, or call another domain’s endpoint as a shortcut.
 *   - Do not swallow errors or expose only an ambiguous boolean when consumers need actionable state.
 *   - Do not put passwords, API keys, signing secrets, database credentials, or trusted authorisation rules in frontend code; browser code is visible to users.
 *   - Do not hardcode route or API path strings when ROUTES or ENDPOINTS provides the value.
 *   - Do not mix several responsibilities merely because they are used by the same screen.
 *
 * RELATED FILES:
 *   - services/* — .NET API wrappers called by feature orchestration.
 *   - features/courses/components/* — consumes this hook’s state contract.
 *   - hooks/useApi.js and store/* — generic request/global-state tools when genuinely appropriate.
 *
 * DIGIFIKILE LMS CONTEXT:
 *   This module participates in course discovery, course detail, enrolment, and instructor course management. The .NET API remains authoritative for validation, permissions, persistence, and business rules. Frontend code presents those outcomes, sends DTO-shaped requests through services, and must handle ProblemDetails/validation failures without assuming the browser is trusted.
 *
 * @example
 *   // const { data, loading, error, refetch } = useCourse()
 */

// Named hook export: implement side effects/status here and return a small, documented contract to UI consumers.
export const useCourse = () => {
  return {
    course: null,
    loading: false,
    error: null,
  }
}
