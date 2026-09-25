/**
 * @file NotFoundPage.jsx — DigiFikile LMS Frontend
 * @layer Page
 */

import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { SITE } from '../constants/site'

export default function NotFoundPage() {
  return (
    <div className="auth-verify-page">
      <div className="verify-card">
        <h1>Page not found</h1>
        <p className="verify-subtitle">
          This page does not exist in {SITE.name}.
        </p>
        <Link to={ROUTES.LOGIN} className="return-login-link">
          Return to login
        </Link>
      </div>
    </div>
  )
}
