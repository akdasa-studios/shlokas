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

interface LibrarySettings {
  lastSyncDate: number
}


export const useSettingsStore = defineStore('settings', () => {
  const storage = useDeviceStore()

  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const localeSettings = ref<LocaleSettings>({
    language: 'en'
  })

  const appearanceSettings = ref<AppearanceSettings>({
    gradeButtons: true,
    colorfulCards: true
  })

  const library = ref<LibrarySettings>({
    lastSyncDate: 0
  })


  watch([
    localeSettings.value,
    appearanceSettings.value,
    library.value
  ], () => onSettingsChanged())


  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  async function load() {
    const loadedLocale     = JSON.parse(await storage.get('locale'))
    const loadedAppearance = JSON.parse(await storage.get('appearance'))
    const loadedLibrary    = JSON.parse(await storage.get('library'))

    if (loadedLocale) {
      localeSettings.value.language = loadedLocale.language
    }
    if (loadedAppearance) {
      appearanceSettings.value.gradeButtons  = loadedAppearance.gradeButtons
      appearanceSettings.value.colorfulCards = loadedAppearance.colorfulCards
    }
    if (loadedLibrary) {
      library.value.lastSyncDate = loadedLibrary.lastSyncDate
    }
  }


  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  async function onSettingsChanged() {
    await storage.set('locale',     JSON.stringify(localeSettings.value))
    await storage.set('appearance', JSON.stringify(appearanceSettings.value))
    await storage.set('library',    JSON.stringify(library.value))
  }


  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return { localeSettings, appearanceSettings, library, load }
})
