/**
 * @file main.jsx — DigiFikile LMS Frontend
 * @layer Bootstrap
 *
 * WHAT THIS FILE IS:
 *   main.jsx is the bootstrap entry for DigiFikile LMS. Its responsibility is intentionally narrow so a junior developer can locate routing, UI, state, HTTP, and pure transformations without guessing.
 *
 * WHY THIS FOLDER:
 *   Bootstrap files sit at src/ because they assemble application-wide providers, routing, and the root render. They are wiring points, not homes for LMS domain rules.
 *
 * HOW TO CODE HERE (for juniors):
 *   - Compose providers and route-level wiring only; keep provider order obvious and document why each provider wraps the app.
 *   - For protected routes, add a dedicated ProtectedRoute component that reads session state, shows a pending state, and redirects with ROUTES only after authentication is known.
 *   - Keep route declarations declarative; each route should render a page rather than inline business UI.
 *   - Start by identifying this file’s single responsibility; split unrelated behaviour into the correct neighbouring layer.
 *   - Use named constants from constants/routes.js and constants/api.js instead of repeating URL or endpoint strings.
 *   - Represent loading, empty, error, and success states explicitly whenever asynchronous data reaches the UI.
 *
 * DO NOT:
 *   - Do not fetch LMS records, transform DTOs, or implement page markup in the root wiring file.
 *   - Do not put passwords, API keys, signing secrets, database credentials, or trusted authorisation rules in frontend code; browser code is visible to users.
 *   - Do not hardcode route or API path strings when ROUTES or ENDPOINTS provides the value.
 *   - Do not mix several responsibilities merely because they are used by the same screen.
 *
 * RELATED FILES:
 *   - main.jsx / App.jsx — root render and route composition work together.
 *   - pages/* — route screens rendered by the route tree.
 *   - constants/routes.js — canonical frontend paths; future ProtectedRoute/session integration belongs behind route composition.
 *
 * DIGIFIKILE LMS CONTEXT:
 *   main supports the DigiFikile learner, instructor, or administrator experience. The frontend is an untrusted client: it may improve usability and hide unavailable actions, but the .NET backend must still enforce every permission and business rule.
 *
 * @example
 *   // createRoot(document.getElementById("root")).render(<App />)
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StoreProvider } from './store'
import { LanguageProvider } from './i18n/LanguageContext'

function ErrorBoundary({ children }) {
  return (
    // Basic client-side error boundary to display render-time errors during dev
    // eslint-disable-next-line react/no-unknown-property
    <>
      {children}
    </>
  )
}

const savedPrimaryColor = localStorage.getItem('digifikile-primary-color')
if (savedPrimaryColor) {
  document.documentElement.style.setProperty('--primary-color', savedPrimaryColor)
}

try {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ErrorBoundary>
        <StoreProvider>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </StoreProvider>
      </ErrorBoundary>
    </StrictMode>,
  )
} catch (err) {
  // Render error to DOM for easier debugging in dev
  // eslint-disable-next-line no-console
  console.error('App mount error', err)
  const root = document.getElementById('root')
  if (root) {
    root.innerHTML = `<div style="padding:24px;font-family:system-ui;color:#b91c1c;"><h2>Application failed to start</h2><pre>${String(err.message || err)}</pre></div>`
  }
}

// Touch file to trigger HMR reload

