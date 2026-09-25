/**
 * @file Loader.jsx — DigiFikile LMS Frontend
 * @layer Feedback UI
 *
 * WHAT THIS FILE IS:
 *   Loader.jsx is the shared status feedback UI for DigiFikile LMS. Its responsibility is intentionally narrow so a junior developer can locate routing, UI, state, HTTP, and pure transformations without guessing.
 *
 * WHY THIS FOLDER:
 *   components/feedback/ contains reusable loading, empty, success, and error presentation. Keeping feedback states shared makes every feature provide a consistent, accessible experience.
 *
 * HOW TO CODE HERE (for juniors):
 *   - Accept message/content and optional action props; do not fetch data or decide domain-specific copy here.
 *   - Use appropriate live-region semantics for asynchronous status changes without repeatedly interrupting assistive technology.
 *   - Keep visuals consistent at mobile and desktop sizes and allow the surrounding feature to control placement.
 *   - Start by identifying this file’s single responsibility; split unrelated behaviour into the correct neighbouring layer.
 *   - Use named constants from constants/routes.js and constants/api.js instead of repeating URL or endpoint strings.
 *   - Represent loading, empty, error, and success states explicitly whenever asynchronous data reaches the UI.
 *
 * DO NOT:
 *   - Do not perform retries automatically, inspect Axios directly, or hardcode feature-specific recovery rules.
 *   - Do not put passwords, API keys, signing secrets, database credentials, or trusted authorisation rules in frontend code; browser code is visible to users.
 *   - Do not hardcode route or API path strings when ROUTES or ENDPOINTS provides the value.
 *   - Do not mix several responsibilities merely because they are used by the same screen.
 *
 * RELATED FILES:
 *   - features/<name>/components/* and pages/* — render request status.
 *   - components/ui/* — shared actions such as retry buttons.
 *
 * DIGIFIKILE LMS CONTEXT:
 *   Loader supports the DigiFikile learner, instructor, or administrator experience. The frontend is an untrusted client: it may improve usability and hide unavailable actions, but the .NET backend must still enforce every permission and business rule.
 *
 * @example
 *   // <Loader label="Loading courses" />
 */

// Default export: render this component through its owning page/feature; keep its props and UI responsibility focused.
export default function Loader({ label = 'Loading DigiFikile LMS data...' }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-400">
      <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-600 border-t-indigo-400" />
      {label}
    </div>
  )
}
