import { createI18n } from 'vue-i18n'
import en from '@/locale/en.json'
import rs from '@/locale/rs.json'
import ru from '@/locale/ru.json'
import { InitArgs, InitStageResult } from '../initialization'


/**
 * Initialize the i18n plugin to support multiple languages
 */
export async function initI18n(
  { vue }: InitArgs
): Promise<InitStageResult> {
  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
      en: en,
      ru: ru,
      rs: rs
    }
  })
  vue.use(i18n)

  return { inject: { "i18n": i18n.global } }
}
