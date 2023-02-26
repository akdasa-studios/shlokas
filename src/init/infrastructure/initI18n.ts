import { createI18n } from 'vue-i18n'
import en from '@/locale/en.json'
import rs from '@/locale/rs.json'
import ru from '@/locale/ru.json'
import uk from '@/locale/uk.json'
import { InitArgs, InitResult } from '../initialization'


/**
 * Initialize the i18n plugin to support multiple languages
 */
export async function initI18n(
  { vue }: InitArgs
): Promise<InitResult> {
  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
      en: en,
      ru: ru,
      rs: rs,
      uk: uk
    }
  })
  vue.use(i18n)

  return { 'i18n': i18n.global }
}
