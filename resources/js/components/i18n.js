import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import translationEN from '../locales/en/translation.json'
import translationFA from '../locales/fa/translation.json' // Dari
import translationPS from '../locales/pa/translation.json' // ✅ Pashto

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      fa: { translation: translationFA },
      ps: { translation: translationPS }, // ✅ Add Pashto
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
