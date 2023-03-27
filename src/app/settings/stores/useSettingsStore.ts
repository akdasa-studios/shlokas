import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useDeviceStore } from '@/app/useDeviceStorage'


interface LocaleSettings {
  language: string
}

interface AppearanceSettings {
  gradeButtons: boolean
  colorfulCards: boolean
}



export const useSettingsStore = defineStore('settings', () => {
  const storage = useDeviceStore()

  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  // Locale settings with default values
  const localeSettings = ref<LocaleSettings>({
    language: 'en'
  })

  // Locale settings with default values
  const appearanceSettings = ref<AppearanceSettings>({
    gradeButtons: true,
    colorfulCards: true
  })


  watch([
    localeSettings.value,
    appearanceSettings.value
  ], () => onSettingsChanged())


  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  async function load() {
    const locale = JSON.parse(await storage.get('locale'))
    const appearance = JSON.parse(await storage.get('appearance'))
    if (locale) {
      localeSettings.value.language = locale.language
    }
    if (appearance) {
      appearanceSettings.value.gradeButtons = appearance.gradeButtons
      appearanceSettings.value.colorfulCards = appearance.colorfulCards
    }
  }


  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  async function onSettingsChanged() {
    await storage.set('locale', JSON.stringify(localeSettings.value))
    await storage.set('appearance', JSON.stringify(appearanceSettings.value))
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return { localeSettings, appearanceSettings, load }
})
