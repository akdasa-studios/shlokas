import { Device } from '@capacitor/device'
import { useSettingsStore } from '@/app/settings'
import { getAvailableLanguages } from '@/app/shared'
import { InitArgs } from '../initialization'

/**
 * Set application locale
 */
export async function initLocale(
  { get }: InitArgs
) {
  // dependencies:
  // const deviceStorage = get('deviceStorage') as any
  const i18n          = get('i18n') as any
  const store         = useSettingsStore()

  // calculate language
  const savedLang    = store.localeSettings.language
  const deviceLang   = (await Device.getLanguageCode()).value
  const fallbackLang = 'en'
  const finalLang    = check(savedLang) || check(deviceLang) || fallbackLang

  // update state
  i18n.locale.value             = finalLang
  store.localeSettings.language = finalLang
}


function check(langCode: string) {
  for (const lang of getAvailableLanguages()) {
    if (lang.code === langCode) { return langCode }
  }
  return undefined
}