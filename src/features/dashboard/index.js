/**
 * @file index.js — DigiFikile LMS Frontend
 * @layer Feature Public API
 *
 * WHAT THIS FILE IS:
 *   index.js is the dashboard feature barrel for DigiFikile LMS. It belongs to the dashboard feature, which covers role-aware dashboard summaries and LMS activity metrics. Its responsibility is intentionally narrow so a junior developer can locate routing, UI, state, HTTP, and pure transformations without guessing.
 *
 * WHY THIS FOLDER:
 *   features/dashboard/index.js is the feature's public boundary. Pages and other approved consumers import from this barrel so internal component/hook paths can change without widespread import edits.
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
 *   - features/dashboard/components/* and hooks/* — internal modules selectively re-exported here.
 *   - pages/* — primary consumers of the public feature API.
 *
 * DIGIFIKILE LMS CONTEXT:
 *   This module participates in role-aware dashboard summaries and LMS activity metrics. The .NET API remains authoritative for validation, permissions, persistence, and business rules. Frontend code presents those outcomes, sends DTO-shaped requests through services, and must handle ProblemDetails/validation failures without assuming the browser is trusted.
 *
 * @example
 *   // import { SomeDashboardComponent } from '../features/dashboard'
 */

// Public feature exports: consumers use this stable boundary instead of importing dashboard internals directly.
export { default as DashboardOverview } from './components/DashboardOverview'
// Public feature exports: consumers use this stable boundary instead of importing dashboard internals directly.
export { default as LearnerDashboard } from './components/LearnerDashboard'
// Public feature exports: consumers use this stable boundary instead of importing dashboard internals directly.
export { default as InstructorDashboard } from './components/InstructorDashboard'
// Public feature exports: consumers use this stable boundary instead of importing dashboard internals directly.
export { default as AdminDashboard } from './components/AdminDashboard'
// Public feature exports: consumers use this stable boundary instead of importing dashboard internals directly.
export { useDashboardMetrics } from './hooks/useDashboardMetrics'
