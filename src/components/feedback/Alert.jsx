/**
 * @file Alert.jsx — DigiFikile LMS Frontend
 * @layer Feedback UI
 *
 * WHAT THIS FILE IS:
 *   Alert.jsx is the shared status feedback UI for DigiFikile LMS. Its responsibility is intentionally narrow so a junior developer can locate routing, UI, state, HTTP, and pure transformations without guessing.
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
 *   Alert supports the DigiFikile learner, instructor, or administrator experience. The frontend is an untrusted client: it may improve usability and hide unavailable actions, but the .NET backend must still enforce every permission and business rule.
 *
 * @example
 *   // <Alert>No records found.</Alert>
 */

const SEVERITY_COLORS = {
  error: 'border-red-800 bg-red-950 text-red-300',
  warning: 'border-amber-800 bg-amber-950 text-amber-300',
  info: 'border-blue-800 bg-blue-950 text-blue-300',
  success: 'border-green-800 bg-green-950 text-green-300',
}

// Default export: render this component through its owning page/feature; keep its props and UI responsibility focused.
export default function Alert({ severity = 'info', message }) {
  const colors = SEVERITY_COLORS[severity] ?? SEVERITY_COLORS.info
  return (
    <div className={`rounded border px-4 py-3 text-sm ${colors}`}>
      {message}
    </div>
  )
}
