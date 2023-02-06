import { Device } from '@capacitor/device'
import { useLocaleStore } from '@/app/settings'
import { InitArgs } from '../initialization'

/**
 * Set application locale
 */
export async function initLocale(
  { get }: InitArgs
) {
  // dependencies:
  const deviceStorage = get("deviceStorage") as any
  const i18n          = get("i18n") as any
  const store         = useLocaleStore()

  // calculate language
  const savedLang    = await deviceStorage.get("language")
  const deviceLang   = (await Device.getLanguageCode()).value
  const fallbackLang = "en"
  const finalLang    = check(savedLang) || check(deviceLang) || fallbackLang

  // update state
  i18n.locale.value  = finalLang
  store.languageCode = finalLang
}

function check(lang: string) {
  // TODO: one place to store available languages
  if (lang === "ru") return "ru"
  if (lang === "en") return "en"
  if (lang === "uk") return "uk"
  return undefined
}