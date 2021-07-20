import { createI18n } from 'vue-i18n'
import ch from './ch.json'
import en from './en.json'
import {getCookie} from '../utils'

const messages = {
  ch,
  en
}

const i18n = createI18n({
  locale: getCookie('lg')? getCookie('lg'): 'ch',
  globalInjection: true,
  fallbackLocale: 'ch',
  messages
})

export default i18n
