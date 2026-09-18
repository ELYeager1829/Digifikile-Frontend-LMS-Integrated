import { useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'

export default function LanguageSwitcher() {
  const { language, setLanguage, languages } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = languages[language] || languages.en

  return (
    <div className="language-switcher-wrap">
      <button
        type="button"
        className="language-switcher-button"
        aria-label="Select language"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span className="language-switcher-icon" aria-hidden="true">🌐</span>
        <span>{currentLanguage.nativeLabel}</span>
        <span className="language-switcher-caret" aria-hidden="true">▼</span>
      </button>

      {isOpen && (
        <div className="language-switcher-menu" role="menu" aria-label="Language menu">
          {Object.entries(languages).map(([code, option]) => (
            <button
              key={code}
              type="button"
              className={`language-switcher-option ${language === code ? 'selected' : ''}`}
              onClick={() => {
                setLanguage(code)
                setIsOpen(false)
              }}
            >
              {option.nativeLabel}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
