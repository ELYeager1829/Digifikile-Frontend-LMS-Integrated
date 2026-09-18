/**
 * @file HelpPanel.jsx — DigiFikile LMS Frontend
 * @layer Feature Component
 *
 * Help center panel (no AppLayout).
 */

import { useLanguage } from '../../../i18n/LanguageContext'

export default function HelpPanel() {
  const { t } = useLanguage()

  return (
    <div className="utility-page">
      <p className="utility-eyebrow">{t('help', 'support')}</p>
      <h1>{t('help', 'title')}</h1>
      <p className="utility-intro">{t('help', 'intro')}</p>
      <section className="utility-panel">
        <h2>{t('help', 'howCanWeHelp')}</h2>
        <p>{t('help', 'description')}</p>
        <div className="help-topics">
          <div className="help-topic">
            <strong>{t('help', 'accountAndProfile')}</strong>
            <span>{t('help', 'accountAndProfileText')}</span>
          </div>
          <div className="help-topic">
            <strong>{t('help', 'learningAndProgress')}</strong>
            <span>{t('help', 'learningAndProgressText')}</span>
          </div>
          <div className="help-topic">
            <strong>{t('help', 'assignmentsAndQuizzes')}</strong>
            <span>{t('help', 'assignmentsAndQuizzesText')}</span>
          </div>
          <div className="help-topic">
            <strong>{t('help', 'technicalSupport')}</strong>
            <span>{t('help', 'technicalSupportText')}</span>
          </div>
        </div>
        <a href="mailto:support@digifikile.org" className="utility-primary-btn help-contact-btn">{t('help', 'contactSupport')}</a>
      </section>
    </div>
  )
}
