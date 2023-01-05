import { createI18n } from 'vue-i18n'

import ru from './locale/ru.json'
import en from './locale/en.json'
import rs from './locale/rs.json'

export let i18n: any

export function initI18n(lang: string) {
  i18n = createI18n({
    legacy: false,
    locale: lang,
    fallbackLocale: 'en',
    messages: {
      en: en,
      ru: ru,
      rs: rs
    }
  })
  return i18n
}