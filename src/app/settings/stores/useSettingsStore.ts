import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useDeviceStore } from '@/app/shared'


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

interface WelcomeSettings {
  done: boolean
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

  const welcome = ref<WelcomeSettings>({
    done: false
  })


  watch([
    localeSettings.value,
    appearanceSettings.value,
    library.value,
    welcome.value
  ], () => onSettingsChanged())


  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  async function load() {
    const loadedLocale     = JSON.parse(await storage.get('locale'))
    const loadedAppearance = JSON.parse(await storage.get('appearance'))
    const loadedLibrary    = JSON.parse(await storage.get('library'))
    const loadedWelcome    = JSON.parse(await storage.get('welcome'))

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
    if (loadedWelcome) {
      welcome.value.done = loadedWelcome.done
    }
  }


  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  async function onSettingsChanged() {
    await storage.set('locale',     JSON.stringify(localeSettings.value))
    await storage.set('appearance', JSON.stringify(appearanceSettings.value))
    await storage.set('library',    JSON.stringify(library.value))
    await storage.set('welcome',    JSON.stringify(welcome.value))
  }


  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return { localeSettings, appearanceSettings, library, welcome, load }
})
