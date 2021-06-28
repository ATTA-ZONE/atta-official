import { createI18n } from 'vue-i18n'
import ch from './ch.json'
import en from './en.json'
import {getCookie} from '../utils'

const messages = {
  ch,
  en
}

const i18n = createI18n({
  locale: getCookie('lang')? getCookie('lang'): 'ch', // set locale
  globalInjection: true,
  fallbackLocale: 'ch', // set fallback locale
  messages // set locale messages
})

export default i18n
