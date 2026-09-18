import { useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useLanguage } from '../../../i18n/LanguageContext'
import { ROUTES } from '../../../constants/routes'
import {
  getApiErrorMessage,
  resendLoginOtp,
  requestPasswordReset,
  verifyLoginOtp,
  verifyPasswordResetOtp,
} from '../../../services/authService'

export default function TwoFactorForm() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const location = useLocation()
  const inputsRef = useRef([])
  const [submitting, setSubmitting] = useState(false)
  const [resending, setResending] = useState(false)
  const [error, setError] = useState('')
  const isPasswordReset = location.state?.flow === 'reset-password'
  const email = location.state?.email || ''
  const maskedEmail = location.state?.maskedEmail || email.replace(/^(.{2}).*(@.*)$/, '$1********$2')

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return
    if (inputsRef.current[index]) inputsRef.current[index].value = value
    if (value && index < 5) inputsRef.current[index + 1]?.focus()
  }

  const readOtp = () => inputsRef.current.map((input) => input?.value || '').join('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const otp = readOtp()
    if (otp.length !== 6) {
      setError('Enter the full 6-digit verification code.')
      return
    }

    setSubmitting(true)
    setError('')
    try {
      if (isPasswordReset) {
        const verified = await verifyPasswordResetOtp({ email, otp })
        navigate(ROUTES.RESET_PASSWORD, {
          state: { email, resetToken: verified.resetToken },
        })
        return
      }

      const authenticated = await verifyLoginOtp({ email, otp })
      const role = authenticated.role === 'SystemAdministrator' ? 'system-admin' : 'seta-admin'
      const destination = location.state?.setupPassword
        ? ROUTES.CHANGE_PASSWORD
        : role === 'system-admin'
          ? ROUTES.SYSTEM_ADMIN_DASHBOARD
          : ROUTES.DASHBOARD
      navigate(destination)
    } catch (err) {
      setError(getApiErrorMessage(err, 'Invalid or expired verification code.'))
    } finally {
      setSubmitting(false)
    }
  }

  const handleResend = async () => {
    if (!email) return
    setResending(true)
    setError('')
    try {
      if (isPasswordReset) await requestPasswordReset(email)
      else await resendLoginOtp(email)
    } catch (err) {
      setError(getApiErrorMessage(err, 'Unable to resend the verification code.'))
    } finally {
      setResending(false)
    }
  }

  if (!email) {
    return (
      <div className="auth-verify-page">
        <div className="verify-card">
          <h1>Verification session expired</h1>
          <Link to={ROUTES.LOGIN} className="return-login-link">{t('common', 'returnToLogin')}</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-verify-page">
      <div className="verify-card">
        <h1>{isPasswordReset ? t('authFlow', 'verifyEmail') : t('authFlow', 'verifyAccount')}</h1>
        <p className="verify-subtitle">{t('authFlow', 'enterCode')}<br />{maskedEmail}</p>

        <form onSubmit={handleSubmit} className="verify-form">
          <div className="otp-inputs compact">
            {Array.from({ length: 6 }).map((_, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                type="text"
                maxLength={1}
                inputMode="numeric"
                className="otp-input compact"
                onChange={(e) => handleChange(i, e.target.value)}
              />
            ))}
          </div>

          {error && <p className="password-error" role="alert">{error}</p>}
          <button type="submit" className="verify-btn" disabled={submitting}>
            {submitting ? 'Verifying…' : t('common', 'verify')}
          </button>
          <button type="button" className="secondary-btn" onClick={handleResend} disabled={resending}>
            {resending ? 'Sending…' : t('common', 'resendCode')}
          </button>
          <Link to={ROUTES.LOGIN} className="return-login-link">{t('common', 'returnToLogin')}</Link>
        </form>
      </div>
    </div>
  )
}
