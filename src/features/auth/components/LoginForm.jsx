/**
 * @file LoginForm.jsx — DigiFikile LMS Frontend
 * @layer Feature Component
 *
 * Sign-in form wired to the administrator login + OTP handshake.
 */

import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import LanguageSwitcher from '../../../components/layout/LanguageSwitcher'
import { LockIcon, UserIcon, VisibilityIcon } from '../../../components/ui/Icons'
import { useLanguage } from '../../../i18n/LanguageContext'
import { ROUTES } from '../../../constants/routes'
import { getApiErrorMessage, login } from '../../../services/authService'

export default function LoginForm() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { t } = useLanguage()
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [credentials, setCredentials] = useState({
    email: searchParams.get('email') || '',
    password: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const challenge = await login(credentials)
      const role = challenge.role === 'SystemAdministrator' ? 'system-admin' : 'seta-admin'
      localStorage.setItem('digifikile-role', role)

      navigate(ROUTES.TWO_FACTOR, {
        state: {
          flow: 'login',
          email: challenge.email,
          maskedEmail: challenge.otpSentTo,
          otpExpiresInMinutes: challenge.otpExpiresInMinutes,
          setupPassword: searchParams.get('setup') === '1',
        },
      })
    } catch (err) {
      setError(getApiErrorMessage(err, 'Invalid email or password.'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="auth-layout">
      <aside className="auth-hero-panel">
        <div className="brand-header">
          <img src="/logo.png" alt="DigiFikile LMS" className="hero-brand-image" />
        </div>

        <h1 className="auth-hero-title">{t('auth', 'heroTitle')}</h1>

        <div className="auth-hero-copy">
          <p>{t('auth', 'heroSubtitle')}</p>
        </div>

        <div className="laptop-figure" aria-hidden="true" />

        <div className="auth-footer-copy">
          <strong>2026 DigiFikile LMS</strong>
          <span>All rights reserved</span>
        </div>
      </aside>

      <main className="auth-form-panel">
        <div className="auth-form-stack">
          <div className="auth-header-controls">
            <LanguageSwitcher />
          </div>

          <div className="auth-card-shell sign-in-shell">
            <h2>{t('nav', 'signIn')}</h2>
            <p className="auth-subtitle small">{t('nav', 'signInSubtitle')}</p>

            <form onSubmit={handleSubmit} className="auth-form">
              <label className="field-label" htmlFor="email">{t('auth', 'emailOrUsername')}</label>
              <div className="auth-input-wrap">
                <span className="input-icon"><UserIcon size={20} color="#454d5c" /></span>
                <input
                  id="email"
                  type="email"
                  className="auth-input with-icon"
                  placeholder="admin@example.com"
                  value={credentials.email}
                  onChange={(e) => setCredentials((prev) => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              <label className="field-label" htmlFor="password">{t('auth', 'password')}</label>
              <div className="auth-input-wrap">
                <span className="input-icon"><LockIcon size={20} color="#454d5c" /></span>
                <input
                  id="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  className="auth-input with-icon"
                  placeholder="••••••••"
                  value={credentials.password}
                  onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                  required
                />
                <button
                  type="button"
                  className="password-visibility-toggle"
                  aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                  onClick={() => setIsPasswordVisible((visible) => !visible)}
                >
                  <VisibilityIcon size={22} color="#454d5c" isVisible={isPasswordVisible} />
                </button>
              </div>

              {error && <p className="password-error" role="alert">{error}</p>}

              <div className="auth-row">
                <label className="remember-box">
                  <input type="checkbox" defaultChecked />
                  <span>{t('auth', 'rememberMe')}</span>
                </label>
                <Link to={ROUTES.FORGOT_PASSWORD} className="inline-link">{t('auth', 'forgotPassword')}</Link>
              </div>

              <button type="submit" className="primary-btn large" disabled={submitting}>
                {submitting ? 'Signing in…' : t('nav', 'login')}
              </button>

              <div className="divider-line">
                <span>{t('auth', 'or')}</span>
              </div>

              <p className="account-cta">
                {t('auth', 'newToDigiFikile')} <Link to={ROUTES.REGISTER} className="create-link">{t('auth', 'createAccount')}</Link>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
