import { createI18n } from 'vue-i18n'

import ru from './locale/ru.json'
import en from './locale/en.json'
import rs from './locale/rs.json'

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: en,
    ru: ru,
    rs: rs
  }
})
