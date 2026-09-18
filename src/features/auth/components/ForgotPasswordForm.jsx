import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserIcon } from '../../../components/ui/Icons'
import { useLanguage } from '../../../i18n/LanguageContext'
import { ROUTES } from '../../../constants/routes'
import { getApiErrorMessage, requestPasswordReset } from '../../../services/authService'

export default function ForgotPasswordForm() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email') || '').trim().toLowerCase()

    setSubmitting(true)
    setError('')
    try {
      const challenge = await requestPasswordReset(email)
      navigate(ROUTES.TWO_FACTOR, {
        state: {
          flow: 'reset-password',
          email,
          maskedEmail: challenge.otpSentTo,
          otpExpiresInMinutes: challenge.otpExpiresInMinutes,
        },
      })
    } catch (err) {
      setError(getApiErrorMessage(err, 'Unable to start password recovery.'))
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
        <div className="auth-hero-copy"><p>{t('auth', 'heroSubtitle')}</p></div>
        <div className="laptop-figure" aria-hidden="true" />
        <div className="auth-footer-copy"><strong>2026 DigiFikile LMS</strong><span>All rights reserved</span></div>
      </aside>

      <main className="auth-form-panel">
        <div className="auth-card-shell forgot-password-shell">
          <h2>{t('auth', 'forgotPassword')}</h2>
          <p className="auth-subtitle small">{t('nav', 'signInSubtitle')}</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <label className="field-label" htmlFor="reset-email">{t('auth', 'emailOrUsername')}</label>
            <div className="auth-input-wrap">
              <span className="input-icon"><UserIcon size={20} color="#454d5c" /></span>
              <input id="reset-email" name="email" type="email" className="auth-input with-icon" placeholder="user@example.com" autoComplete="email" required />
            </div>
            {error && <p className="password-error" role="alert">{error}</p>}
            <button type="submit" className="primary-btn large" disabled={submitting}>
              {submitting ? 'Sending…' : t('common', 'submit')}
            </button>
            <Link to={ROUTES.LOGIN} className="return-login-link">{t('nav', 'login')}</Link>
          </form>
        </div>
      </main>
    </div>
  )
}
