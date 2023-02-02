import { defineStore } from 'pinia'
import { ref, watch, computed, Ref } from 'vue'
import { Language } from '@akdasa-studios/shlokas-core'
import { useDeviceStore } from '@/app/useDeviceStorage'


export const useLocaleStore = defineStore('settings/locale', () => {
  const KEY_LANGUAGE = 'language'
  const storage = useDeviceStore()

  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const languageCode: Ref<string> = ref("en") //i18n.global.locale.value)
  const language = computed(() => availableLanguages.find(x => x.code === languageCode.value) || availableLanguages[0])
  const availableLanguages = [
    new Language("en", "English"),
    new Language("ru", "Русский"),
    // new Language("rs", "Српски")
  ]

  watch(languageCode, onLanguageChanged)

  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  async function load() {
    languageCode.value = (await storage.get(KEY_LANGUAGE)) || "en"
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Private                                  */
  /* -------------------------------------------------------------------------- */

  async function onLanguageChanged(lang: string) {
    await storage.set("language", lang)
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return { language, availableLanguages, languageCode, load }
})