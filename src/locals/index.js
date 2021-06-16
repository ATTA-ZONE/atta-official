import { createI18n } from 'vue-i18n'
import ch from './ch.json'
import en from './en.json'

const messages = {
  ch,
  en
}

const i18n = createI18n({
  locale: 'en', // set locale
  globalInjection: true,
  fallbackLocale: 'ch', // set fallback locale
  messages // set locale messages
})

export default i18n
