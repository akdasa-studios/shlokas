import { createI18n } from 'vue-i18n'
import { App } from 'vue'
import en from '@/locale/en'
import rs from '@/locale/rs/rs.json'
import ru from '@/locale/ru'
import uk from '@/locale/uk'
import { InitArgs, InitResult } from '../initialization'


/**
 * Initialize the i18n plugin to support multiple languages
 */
export async function initI18n(
  { get }: InitArgs
): Promise<InitResult> {
  const vue = get<App>('vue')

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
