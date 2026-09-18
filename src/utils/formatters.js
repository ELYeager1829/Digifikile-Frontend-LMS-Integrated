/**
 * @file formatters.js — DigiFikile LMS Frontend
 * @layer Util
 *
 * WHAT THIS FILE IS:
 *   formatters.js is the pure helper module for DigiFikile LMS. Its responsibility is intentionally narrow so a junior developer can locate routing, UI, state, HTTP, and pure transformations without guessing.
 *
 * WHY THIS FOLDER:
 *   utils/ contains deterministic, framework-free helpers. Pure helpers are easy to test and can be reused by services, hooks, and components without introducing React or network dependencies.
 *
 * HOW TO CODE HERE (for juniors):
 *   - Write small named functions whose output depends only on their arguments; handle null, invalid, and boundary inputs deliberately.
 *   - Document input and return expectations, especially for dates, locale-sensitive formatting, and validation results.
 *   - Add focused unit tests when implementation begins; pure helpers should not require React rendering or an API mock.
 *   - Start by identifying this file’s single responsibility; split unrelated behaviour into the correct neighbouring layer.
 *   - Use named constants from constants/routes.js and constants/api.js instead of repeating URL or endpoint strings.
 *   - Represent loading, empty, error, and success states explicitly whenever asynchronous data reaches the UI.
 *
 * DO NOT:
 *   - Do not import React, access hooks/global stores, perform network requests, mutate arguments, or depend on browser-only state unless the helper explicitly requires it.
 *   - Do not put passwords, API keys, signing secrets, database credentials, or trusted authorisation rules in frontend code; browser code is visible to users.
 *   - Do not hardcode route or API path strings when ROUTES or ENDPOINTS provides the value.
 *   - Do not mix several responsibilities merely because they are used by the same screen.
 *
 * RELATED FILES:
 *   - features/<name>/hooks/* and components/* — consumers of pure formatting/validation.
 *   - services/* — may use transport-safe pure transformations.
 *
 * DIGIFIKILE LMS CONTEXT:
 *   formatters supports the DigiFikile learner, instructor, or administrator experience. The frontend is an untrusted client: it may improve usability and hide unavailable actions, but the .NET backend must still enforce every permission and business rule.
 *
 * @example
 *   // const displayValue = helper(value)
 */

// Named pure-helper export: keep the same input predictable, side-effect free, and safe for isolated tests.
export const formatProgress = (value) => `${Math.round((value ?? 0) * 100)}%`

// Named pure-helper export: keep the same input predictable, side-effect free, and safe for isolated tests.
export const formatGrade = (score, maxScore) => `${score ?? 0} / ${maxScore ?? 0}`

// Named pure-helper export: keep the same input predictable, side-effect free, and safe for isolated tests.
export const formatDuration = (minutes) => {
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
}
