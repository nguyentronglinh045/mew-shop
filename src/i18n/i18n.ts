import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_EN from 'src/locales/en/home.json'
import HOME_VI from 'src/locales/vi/home.json'

export const locales = {
  en: 'English',
  vi: 'Vietnamese'
}

const resources = {
  en: {
    home: HOME_EN
  },
  vi: {
    home: HOME_VI
  }
}
const defaultNS = 'home'
i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  ns: ['home'],
  defaultNS: defaultNS,
  fallbackLng: 'vi',
  interpolation: {
    escapeValue: false
  }
})
