import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import HOME_EN from 'src/locales/en/home.json'
import HOME_VI from 'src/locales/vi/home.json'

export const locales = {
  en: 'EN',
  vi: 'VI'
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
// eslint-disable-next-line import/no-named-as-default-member
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
