/**
 * @file ChangePasswordForm.jsx — DigiFikile LMS Frontend
 * @layer Feature Component
 *
 * Signed-in password change form (no AppLayout).
 */

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LockIcon, VisibilityIcon } from '../../../components/ui/Icons'
import { useLanguage } from '../../../i18n/LanguageContext'
import { ROUTES } from '../../../constants/routes'
import { changePassword, getApiErrorMessage } from '../../../services/authService'

export default function ChangePasswordForm() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [visibleFields, setVisibleFields] = useState({ current: false, next: false, confirm: false })
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const toggleVisibility = (field) => {
    setVisibleFields((fields) => ({ ...fields, [field]: !fields[field] }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const currentPassword = String(formData.get('currentPassword') || '')
    const newPassword = String(formData.get('newPassword') || '')
    const confirmPassword = String(formData.get('confirmPassword') || '')

    if (newPassword !== confirmPassword) {
      setSaved(false)
      setError(t('changePassword', 'passwordMismatch'))
      return
    }

    setSubmitting(true)
    setSaved(false)
    setError('')
    try {
      await changePassword({ currentPassword, newPassword })
      setSaved(true)
      form.reset()
    } catch (err) {
      setError(getApiErrorMessage(err, 'Unable to change the password.'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="change-password-page">
      <p className="utility-eyebrow">{t('changePassword', 'accountSecurity')}</p>
      <h1>{t('changePassword', 'title')}</h1>
      <p className="change-password-intro">{t('changePassword', 'intro')}</p>

      <form className="change-password-panel" onSubmit={handleSubmit}>
        <PasswordField
          id="currentPassword"
          name="currentPassword"
          label={t('changePassword', 'currentPassword')}
          placeholder={t('changePassword', 'currentPasswordPlaceholder')}
          visible={visibleFields.current}
          onToggle={() => toggleVisibility('current')}
        />
        <PasswordField
          id="newPassword"
          name="newPassword"
          label={t('changePassword', 'newPassword')}
          placeholder={t('changePassword', 'newPasswordPlaceholder')}
          visible={visibleFields.next}
          onToggle={() => toggleVisibility('next')}
        />
        <PasswordField
          id="confirmPassword"
          name="confirmPassword"
          label={t('changePassword', 'confirmNewPassword')}
          placeholder={t('changePassword', 'confirmNewPasswordPlaceholder')}
          visible={visibleFields.confirm}
          onToggle={() => toggleVisibility('confirm')}
        />

        <p className="change-password-hint">{t('changePassword', 'passwordRule')}</p>
        {error && <p className="form-error" role="alert">{error}</p>}
        {saved && <p className="change-password-success" role="status">{t('changePassword', 'saved')}</p>}

        <div className="change-password-actions">
          <button type="submit" className="utility-primary-btn" disabled={submitting}>{submitting ? 'Saving…' : t('changePassword', 'saveNewPassword')}</button>
          <button type="button" className="profile-secondary-btn" onClick={() => navigate(ROUTES.PROFILE_SETTINGS)}>
            {t('common', 'cancel')}
          </button>
        </div>
        <button type="button" className="change-password-profile-btn" onClick={() => navigate(ROUTES.PROFILE_SETTINGS)}>
          {t('changePassword', 'returnToProfileSetting')}
        </button>
        <Link to={ROUTES.FORGOT_PASSWORD} className="change-password-recovery-link">
          {t('changePassword', 'forgotCurrentPassword')}
        </Link>
      </form>
    </div>
  )
}

function PasswordField({ id, name, label, placeholder, visible, onToggle }) {
  return (
    <>
      <label className="change-password-field" htmlFor={id}>{label}</label>
      <div className="change-password-input-wrap">
        <LockIcon size={19} color="#667085" />
        <input id={id} name={name} type={visible ? 'text' : 'password'} placeholder={placeholder} minLength={8} required />
        <button
          type="button"
          className="password-visibility-toggle"
          aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          onClick={onToggle}
        >
          <VisibilityIcon size={21} color="#667085" isVisible={visible} />
        </button>
      </div>
    </>
  )
}
