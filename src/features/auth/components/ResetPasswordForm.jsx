/**
 * @file ResetPasswordForm.jsx — DigiFikile LMS Frontend
 * @layer Feature Component
 *
 * New-password form after email verification (no page layout).
 */

import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LockIcon, VisibilityIcon } from '../../../components/ui/Icons'
import { useLanguage } from '../../../i18n/LanguageContext'
import { ROUTES } from '../../../constants/routes'
import { getApiErrorMessage, resetPassword } from '../../../services/authService'

export default function ResetPasswordForm() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const location = useLocation()
  const [submitting, setSubmitting] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const password = String(formData.get('password') || '')
    const confirmPassword = String(formData.get('confirmPassword') || '')

    if (password !== confirmPassword) {
      setError(t('authFlow', 'passwordMismatch'))
      return
    }

    const email = location.state?.email
    const resetToken = location.state?.resetToken
    if (!email || !resetToken) {
      setError('The password reset session has expired. Please start again.')
      return
    }

    setSubmitting(true)
    setError('')
    try {
      await resetPassword({ email, resetToken, newPassword: password })
      navigate(ROUTES.LOGIN, { state: { passwordReset: true } })
    } catch (err) {
      setError(getApiErrorMessage(err, 'Unable to reset the password.'))
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

        <h1 className="auth-hero-title">{t('authFlow', 'manageLearning')}<br />{t('authFlow', 'empowerLearners')}</h1>

        <div className="auth-hero-copy">
          <p>{t('authFlow', 'setNewPassword')}<br />{t('authFlow', 'getBackToLearning')}</p>
        </div>

        <div className="laptop-figure" aria-hidden="true" />

        <div className="auth-footer-copy">
          <strong>2026 DigiFikile LMS</strong>
          <span>{t('auth', 'footer')}</span>
        </div>
      </aside>

      <main className="auth-form-panel">
        <div className="auth-card-shell reset-password-shell">
          <h2>{t('authFlow', 'updatePasswordTitle')}</h2>
          <p className="auth-subtitle small">{t('authFlow', 'updatePasswordSubtitle')}</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <label className="field-label" htmlFor="password">{t('common', 'newPassword')}</label>
            <div className="auth-input-wrap">
              <span className="input-icon"><LockIcon size={20} color="#454d5c" /></span>
              <input
                id="password"
                name="password"
                type={isPasswordVisible ? 'text' : 'password'}
                className="auth-input with-icon"
                placeholder="Enter new password"
                minLength={8}
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

            <label className="field-label" htmlFor="confirmPassword">{t('common', 'confirmNewPassword')}</label>
            <div className="auth-input-wrap">
              <span className="input-icon"><LockIcon size={20} color="#454d5c" /></span>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={isConfirmPasswordVisible ? 'text' : 'password'}
                className="auth-input with-icon"
                placeholder="Re-enter new password"
                minLength={8}
                required
              />
              <button
                type="button"
                className="password-visibility-toggle"
                aria-label={isConfirmPasswordVisible ? 'Hide confirm password' : 'Show confirm password'}
                onClick={() => setIsConfirmPasswordVisible((visible) => !visible)}
              >
                <VisibilityIcon size={22} color="#454d5c" isVisible={isConfirmPasswordVisible} />
              </button>
            </div>

            <p className="password-requirement">{t('common', 'useAtLeast8Characters')}</p>
            {error && <p className="password-error" role="alert">{error}</p>}

            <button type="submit" className="primary-btn large" disabled={submitting}>{submitting ? 'Updating…' : t('common', 'updatePassword')}</button>
            <Link to={ROUTES.LOGIN} className="return-login-link">{t('common', 'returnToLogin')}</Link>
          </form>
        </div>
      </main>
    </div>
  )
}
