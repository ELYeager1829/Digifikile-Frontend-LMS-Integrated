/**
 * @file progressService.js — DigiFikile LMS Frontend
 * @layer Service
 *
 * WHAT THIS FILE IS:
 *   progressService.js is the progressService HTTP boundary for DigiFikile LMS. Its responsibility is intentionally narrow so a junior developer can locate routing, UI, state, HTTP, and pure transformations without guessing.
 *
 * WHY THIS FOLDER:
 *   services/ is the only layer for endpoint-specific Axios wrappers. It translates between frontend-friendly values and .NET request/response DTOs while sharing the configured client from lib/api.js.
 *
 * HOW TO CODE HERE (for juniors):
 *   - Import the shared api client from lib/api.js and endpoint names from constants/api.js; return useful data rather than leaking the full Axios response unless metadata is required.
 *   - Give each operation explicit parameters matching the .NET controller contract, encode route/query values safely, and let rejected promises preserve actionable backend errors.
 *   - Map .NET DTO casing/nullability into a stable frontend model here when the conversion is transport-specific; document pagination and validation-error shapes.
 *   - Use named exports for each operation so hooks can import only the calls they need and tests can mock boundaries clearly.
 *   - Start by identifying this file’s single responsibility; split unrelated behaviour into the correct neighbouring layer.
 *   - Use named constants from constants/routes.js and constants/api.js instead of repeating URL or endpoint strings.
 *   - Represent loading, empty, error, and success states explicitly whenever asynchronous data reaches the UI.
 *
 * DO NOT:
 *   - Do not render JSX, use React hooks, access component state, or import from pages/features.
 *   - Do not create a new Axios instance per service or repeat authentication-header code.
 *   - Do not put passwords, API keys, signing secrets, database credentials, or trusted authorisation rules in frontend code; browser code is visible to users.
 *   - Do not hardcode route or API path strings when ROUTES or ENDPOINTS provides the value.
 *   - Do not mix several responsibilities merely because they are used by the same screen.
 *
 * RELATED FILES:
 *   - lib/api.js — configured Axios instance used for HTTP.
 *   - constants/api.js — canonical .NET endpoint paths.
 *   - features/<name>/hooks/* — consumes service operations and presents UI-ready state.
 *
 * DIGIFIKILE LMS CONTEXT:
 *   DigiFikile’s .NET backend is the source of truth for LMS records, validation, authentication, and role enforcement. This frontend boundary sends JSON over the configured API base URL and must tolerate nulls, validation errors, 401/403 responses, and evolving DTO contracts.
 *
 * @example
 *   // const result = await someOperation(valuesMatchingDotNetDto)
 */

import { ENDPOINTS } from '../constants/api'

// Named service export: call the shared API client here and return mapped data or a rejected actionable error.
export const fetchUserProgress = async () => {
  return Promise.resolve([])
}

// Named service export: call the shared API client here and return mapped data or a rejected actionable error.
export const fetchCourseProgress = async () => {
  return Promise.resolve(null)
}

// Named service export: call the shared API client here and return mapped data or a rejected actionable error.
export const fetchCompletionStatus = async () => {
  return Promise.resolve({ completed: false, percentage: 0 })
}

// Named service export: call the shared API client here and return mapped data or a rejected actionable error.
export const markLessonComplete = async () => {
  throw new Error('Not implemented')
}

// Named service export: call the shared API client here and return mapped data or a rejected actionable error.
export const PROGRESS_ENDPOINTS = ENDPOINTS.PROGRESS
