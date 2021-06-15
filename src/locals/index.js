import { createI18n } from 'vue-i18n'
import zh from './zh.json'
import en from './en.json'

const messages = {
  zh,
  en
}

const i18n = createI18n({
  locale: 'en', // set locale
  globalInjection: true,
  fallbackLocale: 'zh', // set fallback locale
  messages // set locale messages
})

export default i18n
