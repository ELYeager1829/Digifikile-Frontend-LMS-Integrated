import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { defaultLanguage, SUPPORTED_LANGUAGES, translations } from './translations'

const STORAGE_KEY = 'digifikile-language'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') {
      return defaultLanguage
    }

    const savedLanguage = localStorage.getItem(STORAGE_KEY)
    return savedLanguage && translations[savedLanguage]
      ? savedLanguage
      : defaultLanguage
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, language)
    }
  }, [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      languages: SUPPORTED_LANGUAGES,
      t: (section, key) => {
        const currentTranslations = translations[language] || translations[defaultLanguage]
        const fallbackTranslations = translations[defaultLanguage]

        const resolveValue = (source, path) => {
          if (!source || !path) return undefined

          return path.split('.').reduce((result, part) => {
            if (result == null) return undefined
            return result[part]
          }, source)
        }

        return resolveValue(currentTranslations?.[section], key) ?? resolveValue(fallbackTranslations?.[section], key) ?? key
      },
      currentLanguageLabel: SUPPORTED_LANGUAGES[language]?.nativeLabel || SUPPORTED_LANGUAGES[defaultLanguage].nativeLabel,
    }),
    [language]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }

  return context
}
