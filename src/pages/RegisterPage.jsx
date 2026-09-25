/**
 * @file RegisterPage.jsx — DigiFikile LMS Frontend
 * @layer Page
 *
 * WHAT THIS FILE IS:
 *   RegisterPage.jsx is the route screen for DigiFikile LMS. Its responsibility is intentionally narrow so a junior developer can locate routing, UI, state, HTTP, and pure transformations without guessing.
 *
 * WHY THIS FOLDER:
 *   pages/ contains components mounted directly by React Router. A page should read route parameters and compose layout plus feature exports; it should stay thin and must not become a second feature implementation.
 *
 * HOW TO CODE HERE (for juniors):
 *   - Import feature UI through features/<name>/index.js, compose shared Navbar/Sidebar/Footer as needed, and pass route params or simple props downward.
 *   - Use semantic landmarks such as <main>, one logical <h1>, and meaningful page titles; preserve keyboard and screen-reader navigation.
 *   - Build mobile-first with responsive Tailwind utilities (for example, stacked by default and flex/grid at breakpoints); avoid fixed pixel widths.
 *   - Start by identifying this file’s single responsibility; split unrelated behaviour into the correct neighbouring layer.
 *   - Use named constants from constants/routes.js and constants/api.js instead of repeating URL or endpoint strings.
 *   - Represent loading, empty, error, and success states explicitly whenever asynchronous data reaches the UI.
 *
 * DO NOT:
 *   - Do not call Axios or .NET endpoints directly, duplicate feature logic, or bury DTO mapping inside page JSX.
 *   - Do not put passwords, API keys, signing secrets, database credentials, or trusted authorisation rules in frontend code; browser code is visible to users.
 *   - Do not hardcode route or API path strings when ROUTES or ENDPOINTS provides the value.
 *   - Do not mix several responsibilities merely because they are used by the same screen.
 *
 * RELATED FILES:
 *   - features/<name>/index.js — public feature components/hooks composed by route screens.
 *   - components/layout/* — shared app-shell pieces.
 *   - App.jsx and constants/routes.js — route registration and canonical paths.
 *
 * DIGIFIKILE LMS CONTEXT:
 *   RegisterPage supports the DigiFikile learner, instructor, or administrator experience. The frontend is an untrusted client: it may improve usability and hide unavailable actions, but the .NET backend must still enforce every permission and business rule.
 *
 * @example
 *   // <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
 */

import { RegisterForm } from '../features/auth'

// Default export: render this component through its owning page/feature; keep its props and UI responsibility focused.
export default function RegisterPage() {
  return <RegisterForm />
}
