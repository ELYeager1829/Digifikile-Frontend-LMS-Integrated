/**
 * @file Navbar.jsx — DigiFikile LMS Frontend
 * @layer Layout
 *
 * WHAT THIS FILE IS:
 *   Navbar.jsx is the shared application shell UI for DigiFikile LMS. Its responsibility is intentionally narrow so a junior developer can locate routing, UI, state, HTTP, and pure transformations without guessing.
 *
 * WHY THIS FOLDER:
 *   components/layout/ contains reusable application-shell pieces that arrange many routes. Layout components may render navigation and children, but should not own feature-specific fetching or business decisions.
 *
 * HOW TO CODE HERE (for juniors):
 *   - Accept children or simple navigation props and compose shared primitives; route-specific content should be supplied by the page.
 *   - Use semantic <header>, <nav>, <aside>, <main>, and <footer> landmarks appropriately, with visible focus styles and accessible navigation labels.
 *   - Use responsive Tailwind breakpoints so navigation remains usable on small screens without hard-coded widths.
 *   - Start by identifying this file’s single responsibility; split unrelated behaviour into the correct neighbouring layer.
 *   - Use named constants from constants/routes.js and constants/api.js instead of repeating URL or endpoint strings.
 *   - Represent loading, empty, error, and success states explicitly whenever asynchronous data reaches the UI.
 *
 * DO NOT:
 *   - Do not fetch feature records, map backend DTOs, or make role/permission decisions from untrusted UI-only checks.
 *   - Do not put passwords, API keys, signing secrets, database credentials, or trusted authorisation rules in frontend code; browser code is visible to users.
 *   - Do not hardcode route or API path strings when ROUTES or ENDPOINTS provides the value.
 *   - Do not mix several responsibilities merely because they are used by the same screen.
 *
 * RELATED FILES:
 *   - pages/* — compose shared layout around route content.
 *   - components/ui/* and constants/routes.js — reusable controls and canonical navigation targets.
 *
 * DIGIFIKILE LMS CONTEXT:
 *   Navbar supports the DigiFikile learner, instructor, or administrator experience. The frontend is an untrusted client: it may improve usability and hide unavailable actions, but the .NET backend must still enforce every permission and business rule.
 *
 * @example
 *   // <Navbar><main>Route content</main></Navbar>
 */

import { Link } from 'react-router-dom'
import { SITE, NAV_LINKS } from '../../constants/site'
import { ROUTES } from '../../constants/routes'

// Default export: render this component through its owning page/feature; keep its props and UI responsibility focused.
export default function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-slate-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to={ROUTES.HOME}>
          <p className="text-xs uppercase tracking-widest text-indigo-400">{SITE.name}</p>
          <p className="text-sm text-slate-300">{SITE.tagline}</p>
        </Link>
        <nav className="flex items-center gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-xs text-slate-300 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
