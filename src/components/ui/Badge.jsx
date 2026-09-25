import React from 'react'

export function Badge({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800 ${className}`}>
      {children}
    </span>
  )
}

export default Badge
/**
 * @file Badge.jsx — DigiFikile LMS Frontend
 * @layer UI
 *
 * WHAT THIS FILE IS:
 *   Badge.jsx is the shared design-system primitive for DigiFikile LMS. Its responsibility is intentionally narrow so a junior developer can locate routing, UI, state, HTTP, and pure transformations without guessing.
 *
 * WHY THIS FOLDER:
 *   components/ui/ contains small reusable visual primitives used across unrelated features. These components define consistent styling and accessibility while remaining unaware of LMS domain data.
 *
 * HOW TO CODE HERE (for juniors):
 *   - Define a small prop contract for content, variants, disabled/loading state, className extension, and event forwarding.
 *   - Prefer native semantic elements and forward relevant HTML attributes; preserve focus indication and sufficient colour contrast.
 *   - Keep styling responsive and composable; this primitive must work in courses, assessments, admin screens, and narrow mobile layouts.
 *   - Start by identifying this file’s single responsibility; split unrelated behaviour into the correct neighbouring layer.
 *   - Use named constants from constants/routes.js and constants/api.js instead of repeating URL or endpoint strings.
 *   - Represent loading, empty, error, and success states explicitly whenever asynchronous data reaches the UI.
 *
 * DO NOT:
 *   - Do not import feature hooks/services, hardcode LMS-specific wording, or remove native accessibility behaviour for styling convenience.
 *   - Do not put passwords, API keys, signing secrets, database credentials, or trusted authorisation rules in frontend code; browser code is visible to users.
 *   - Do not hardcode route or API path strings when ROUTES or ENDPOINTS provides the value.
 *   - Do not mix several responsibilities merely because they are used by the same screen.
 *
 * RELATED FILES:
 *   - components/layout/* and features/<name>/components/* — consumers of shared primitives.
 *   - components/feedback/* — complementary shared status presentation.
 *
 * DIGIFIKILE LMS CONTEXT:
 *   Badge supports the DigiFikile learner, instructor, or administrator experience. The frontend is an untrusted client: it may improve usability and hide unavailable actions, but the .NET backend must still enforce every permission and business rule.
 *
 * @example
 *   // <Badge aria-label="Save course">Save</Badge>
 */

const STATUS_COLORS = {
  completed: 'bg-green-900 text-green-300',
  'in-progress': 'bg-amber-900 text-amber-300',
  overdue: 'bg-red-900 text-red-300',
  admin: 'bg-purple-900 text-purple-300',
  instructor: 'bg-blue-900 text-blue-300',
  learner: 'bg-slate-700 text-slate-300',
  default: 'bg-slate-700 text-slate-300',
}

// Default export: render this component through its owning page/feature; keep its props and UI responsibility focused.
export default function Badge({ status = 'default', children }) {
  const colors = STATUS_COLORS[status] ?? STATUS_COLORS.default
  return (
    <span className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${colors}`}>
      {children}
    </span>
  )
}
