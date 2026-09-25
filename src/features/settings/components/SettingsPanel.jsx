/**
 * @file SettingsPanel.jsx — DigiFikile LMS Frontend
 * @layer Feature Component
 *
 * Admin system settings (branding, email, notifications, integrations).
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../../i18n/LanguageContext'
import { ROUTES } from '../../../constants/routes'

export default function SettingsPanel() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [saved, setSaved] = useState(false)
  const [logoPreview, setLogoPreview] = useState('/logo.png')
  const [primaryColor, setPrimaryColor] = useState(() => localStorage.getItem('digifikile-primary-color') || '#1976df')

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setLogoPreview(URL.createObjectURL(file))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSaved(true)
  }

  const handlePrimaryColorChange = (event) => {
    const color = event.target.value
    setPrimaryColor(color)
    localStorage.setItem('digifikile-primary-color', color)
    document.documentElement.style.setProperty('--primary-color', color)
  }

  return (
    <div className="admin-settings-page">
      <div className="admin-settings-heading">
        <p className="utility-eyebrow">{t('settings', 'administration')}</p>
        <h1>{t('settings', 'systemSettings')}</h1>
        <p>{t('settings', 'manageBranding')}</p>
      </div>

      <form className="admin-settings-grid" onSubmit={handleSubmit}>
        <section className="admin-settings-card">
          <div className="admin-settings-card-heading">
            <div>
              <h2>{t('settings', 'branding')}</h2>
              <p>{t('settings', 'brandingSubtitle')}</p>
            </div>
          </div>
          <div className="branding-preview">
            <img src={logoPreview} alt="Current DigiFikile logo" />
            <div>
              <strong>{t('settings', 'primaryLogo')}</strong>
              <span>{t('settings', 'logoHint')}</span>
            </div>
          </div>
          <label className="admin-settings-label">
            <span>{t('settings', 'logo')}</span>
            <input type="file" accept="image/png,image/jpeg,image/svg+xml" onChange={handleLogoChange} />
          </label>
          <div className="settings-fields">
            <label>
              <span>{t('settings', 'primaryColour')}</span>
              <input type="color" value={primaryColor} onChange={handlePrimaryColorChange} />
            </label>
          </div>
        </section>

        <section className="admin-settings-card">
          <div className="admin-settings-card-heading">
            <div>
              <h2>{t('settings', 'emailTemplates')}</h2>
              <p>{t('settings', 'emailTemplatesSubtitle')}</p>
            </div>
          </div>
          <label className="admin-settings-label">
            <span>{t('settings', 'template')}</span>
            <select defaultValue="welcome">
              <option value="welcome">{t('settings', 'welcomeEmail')}</option>
              <option value="verification">{t('settings', 'verificationCode')}</option>
              <option value="password-reset">{t('settings', 'passwordReset')}</option>
              <option value="assignment">{t('settings', 'assignmentReminder')}</option>
            </select>
          </label>
          <label className="admin-settings-label">
            <span>{t('settings', 'emailSubject')}</span>
            <input type="text" defaultValue="Welcome to DigiFikile LMS" />
          </label>
          <label className="admin-settings-label">
            <span>{t('settings', 'emailContent')}</span>
            <textarea
              defaultValue={'Hello {{learnerName}},\n\nWelcome to DigiFikile LMS. We are excited to have you learning with us.'}
              rows="5"
            />
          </label>
        </section>

        <section className="admin-settings-card">
          <div className="admin-settings-card-heading">
            <div>
              <h2>{t('settings', 'notificationSettings')}</h2>
              <p>{t('settings', 'notificationSettingsSubtitle')}</p>
            </div>
          </div>
          <div className="admin-notification-list">
            <label>
              <span>
                <strong>{t('settings', 'emailNotifications')}</strong>
                <small>{t('settings', 'emailNotificationsText')}</small>
              </span>
              <input type="checkbox" defaultChecked />
            </label>
            <label>
              <span>
                <strong>{t('settings', 'inAppNotifications')}</strong>
                <small>{t('settings', 'inAppNotificationsText')}</small>
              </span>
              <input type="checkbox" defaultChecked />
            </label>
            <label>
              <span>
                <strong>{t('settings', 'smsNotifications')}</strong>
                <small>{t('settings', 'smsNotificationsText')}</small>
              </span>
              <input type="checkbox" />
            </label>
            <label>
              <span>
                <strong>{t('settings', 'assignmentReminders')}</strong>
                <small>{t('settings', 'assignmentRemindersText')}</small>
              </span>
              <input type="checkbox" defaultChecked />
            </label>
          </div>
        </section>

        <section className="admin-settings-card">
          <div className="admin-settings-card-heading">
            <div>
              <h2>{t('settings', 'integrations')}</h2>
              <p>{t('settings', 'integrationsSubtitle')}</p>
            </div>
          </div>
          <div className="integration-row">
            <div>
              <strong>{t('settings', 'emailProvider')}</strong>
              <span>{t('settings', 'emailProviderText')}</span>
            </div>
            <button type="button" className="integration-status connected">{t('settings', 'connected')}</button>
          </div>
          <div className="integration-row">
            <div>
              <strong>{t('settings', 'googleWorkspace')}</strong>
              <span>{t('settings', 'googleWorkspaceText')}</span>
            </div>
            <button type="button" className="integration-status">{t('settings', 'connect')}</button>
          </div>
          <div className="integration-row">
            <div>
              <strong>{t('settings', 'learningAnalytics')}</strong>
              <span>{t('settings', 'learningAnalyticsText')}</span>
            </div>
            <button type="button" className="integration-status">{t('settings', 'connect')}</button>
          </div>
        </section>

        <div className="admin-settings-actions">
          <button type="submit" className="utility-primary-btn">{t('settings', 'saveSettings')}</button>
          <button type="button" className="admin-settings-return-btn" onClick={() => navigate(ROUTES.SETTINGS)}>
            {t('settings', 'returnToSettings')}
          </button>
          {saved && <span role="status">{t('settings', 'settingsSaved')}</span>}
        </div>
      </form>
    </div>
  )
}
