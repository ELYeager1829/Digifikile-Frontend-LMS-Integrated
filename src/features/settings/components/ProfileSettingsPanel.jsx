/**
 * @file ProfileSettingsPanel.jsx — DigiFikile LMS Frontend
 * @layer Feature Component
 *
 * Current-user profile editor. Visual structure is intentionally preserved; data now comes
 * from the authenticated backend account rather than hard-coded/local-only demo values.
 */

import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../../i18n/LanguageContext'
import { ROUTES } from '../../../constants/routes'
import { updateCurrentUserProfile } from '../../../services/authService'
import useCurrentUser from '../../auth/hooks/useCurrentUser'

export default function ProfileSettingsPanel() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const { user, loading, error: loadError, refresh } = useCurrentUser()
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [profilePhoto, setProfilePhoto] = useState('')
  const [form, setForm] = useState({ name: '', surname: '', email: '', phone: '', address: '' })

  useEffect(() => {
    if (!user) return
    setForm({
      name: user.name || '',
      surname: user.surname || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
    })
  }, [user])

  const fullName = useMemo(() => [form.name, form.surname].filter(Boolean).join(' ').trim() || form.email || 'DigiFikile User', [form])
  const initials = useMemo(() => {
    const value = [form.name, form.surname].filter(Boolean).map(part => part[0]).join('').toUpperCase()
    return value || 'DF'
  }, [form.name, form.surname])

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setProfilePhoto(URL.createObjectURL(file))
  }

  const handleFullNameChange = (value) => {
    const parts = value.trimStart().split(/\s+/)
    setForm(current => ({
      ...current,
      name: parts.shift() || '',
      surname: parts.join(' '),
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setSaved(false)
    setSaveError('')
    try {
      await updateCurrentUserProfile({
        name: form.name,
        surname: form.surname,
        phone: form.phone || null,
        address: form.address || null,
      })
      await refresh()
      setSaved(true)
    } catch (err) {
      setSaveError(err?.response?.data?.error || err?.message || 'Unable to save profile changes.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="profile-settings-page">
      <div className="profile-settings-heading">
        <div>
          <p className="utility-eyebrow">{t('profileSettings', 'myAccount')}</p>
          <h1>{t('profileSettings', 'title')}</h1>
          <p>{t('profileSettings', 'subtitle')}</p>
        </div>
        <div className="profile-avatar large" aria-label={`${fullName} profile photo`}>
          {profilePhoto ? <img src={profilePhoto} alt="Selected profile" /> : initials}
        </div>
      </div>

      {loading && !user && <p role="status">Loading profile…</p>}
      {loadError && <p className="um-error" role="alert">Unable to load your profile. Please sign in again or retry.</p>}
      {saveError && <p className="um-error" role="alert">{saveError}</p>}

      <form className="profile-settings-grid" onSubmit={handleSubmit}>
        <section className="profile-settings-panel personal-details-panel">
          <div className="profile-panel-heading">
            <div>
              <h2>{t('profileSettings', 'personalDetails')}</h2>
              <p>{t('profileSettings', 'personalDetailsSubtitle')}</p>
            </div>
            <div className="profile-avatar" aria-hidden="true">
              {profilePhoto ? <img src={profilePhoto} alt="Selected profile" /> : initials}
            </div>
          </div>
          <div className="profile-fields">
            <label>
              <span>{t('profileSettings', 'fullName')}</span>
              <input name="fullName" type="text" value={fullName} onChange={(event) => handleFullNameChange(event.target.value)} required />
            </label>
            <label>
              <span>{t('profileSettings', 'emailAddress')}</span>
              <input name="email" type="email" value={form.email} readOnly title="Email changes are not supported by the current self-profile backend contract." />
            </label>
            <label>
              <span>{t('profileSettings', 'phoneNumber')}</span>
              <input name="phone" type="tel" value={form.phone} onChange={(event) => setForm(current => ({ ...current, phone: event.target.value }))} placeholder="+27 00 000 0000" />
            </label>
            <label>
              <span>Address</span>
              <input name="address" type="text" value={form.address} onChange={(event) => setForm(current => ({ ...current, address: event.target.value }))} />
            </label>
            <label>
              <span>{t('profileSettings', 'profilePhoto')}</span>
              <input
                id="profile-photo-input"
                className="profile-photo-input"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handlePhotoChange}
              />
              <button
                type="button"
                className="profile-upload-btn"
                onClick={() => document.getElementById('profile-photo-input')?.click()}
              >
                {t('profileSettings', 'uploadPhoto')}
              </button>
              <small>Photo preview is local only; the current backend has no profile-photo endpoint.</small>
            </label>
          </div>
        </section>

        <section className="profile-settings-panel account-settings-panel">
          <div className="profile-panel-heading">
            <div>
              <h2>{t('profileSettings', 'accountSettings')}</h2>
              <p>{t('profileSettings', 'accountSettingsSubtitle')}</p>
            </div>
          </div>
          <div className="account-settings-list">
            <div className="account-setting-row">
              <div><strong>Username</strong><span>{user?.username || form.email || 'Not provided'}</span></div>
            </div>
            <div className="account-setting-row">
              <div><strong>Role</strong><span>{user?.role || 'Not provided'}</span></div>
            </div>
            <div className="account-setting-row">
              <div>
                <strong>{t('profileSettings', 'password')}</strong>
                <span>{t('profileSettings', 'passwordLastUpdated')}</span>
              </div>
              <button type="button" className="profile-secondary-btn" onClick={() => navigate(ROUTES.CHANGE_PASSWORD)}>
                {t('profileSettings', 'changePassword')}
              </button>
            </div>
            <div className="notification-options">
              <p className="notification-options-title">{t('profileSettings', 'notificationChannels')}</p>
              <label className="profile-toggle">
                <span><strong>{t('profileSettings', 'smsNotifications')}</strong><small>{t('profileSettings', 'smsNotificationsText')}</small></span>
                <input type="checkbox" name="smsNotifications" />
              </label>
              <label className="profile-toggle">
                <span><strong>{t('profileSettings', 'emailNotifications')}</strong><small>{t('profileSettings', 'emailNotificationsText')}</small></span>
                <input type="checkbox" name="emailNotifications" defaultChecked />
              </label>
              <label className="profile-toggle">
                <span><strong>{t('profileSettings', 'pushNotifications')}</strong><small>{t('profileSettings', 'pushNotificationsText')}</small></span>
                <input type="checkbox" name="pushNotifications" defaultChecked />
              </label>
            </div>
            <label className="profile-toggle">
              <span><strong>{t('profileSettings', 'profileVisibility')}</strong><small>{t('profileSettings', 'profileVisibilityText')}</small></span>
              <input type="checkbox" />
            </label>
          </div>
        </section>

        <div className="profile-settings-actions">
          <button type="submit" className="utility-primary-btn" disabled={saving || loading}>{saving ? 'Saving…' : t('profileSettings', 'saveChanges')}</button>
          {saved && <span role="status">{t('profileSettings', 'saved')}</span>}
        </div>
      </form>
    </div>
  )
}
