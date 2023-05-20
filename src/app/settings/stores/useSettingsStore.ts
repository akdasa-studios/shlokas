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

interface AuthSettings {
  token: string
  collectionId: string
  sessionId: string
  strategy: string
  refreshedAt?: number
  expiresAt?: number
}


export const useSettingsStore = defineStore('settings', () => {
  const storage = useDeviceStore()

  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const locale = ref<LocaleSettings>({
    language: 'en'
  })

  const appearance = ref<AppearanceSettings>({
    gradeButtons: true,
    colorfulCards: true
  })

  const library = ref<LibrarySettings>({
    lastSyncDate: 0
  })

  const welcome = ref<WelcomeSettings>({
    done: false
  })

  const auth = ref<AuthSettings>({
    token: '',
    collectionId: '',
    sessionId: '',
    strategy: '',
    refreshedAt: 0,
    expiresAt: 0
  })

  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  async function load() {
    const loadedLocale     = JSON.parse(await storage.get('locale'))
    const loadedAppearance = JSON.parse(await storage.get('appearance'))
    const loadedLibrary    = JSON.parse(await storage.get('library'))
    const loadedWelcome    = JSON.parse(await storage.get('welcome'))
    const loadedAuth       = JSON.parse(await storage.get('auth'))

    if (loadedLocale) {
      locale.value.language = loadedLocale.language
    }
    if (loadedAppearance) {
      appearance.value.gradeButtons  = loadedAppearance.gradeButtons
      appearance.value.colorfulCards = loadedAppearance.colorfulCards
    }
    if (loadedLibrary) {
      library.value.lastSyncDate = loadedLibrary.lastSyncDate
    }
    if (loadedWelcome) {
      welcome.value.done = loadedWelcome.done
    }
    if (loadedAuth) {
      auth.value.collectionId = loadedAuth.collectionId
      auth.value.token = loadedAuth.token
      auth.value.sessionId = loadedAuth.sessionId
      auth.value.strategy = loadedAuth.strategy
      auth.value.refreshedAt = loadedAuth.refreshedAt
      auth.value.expiresAt = loadedAuth.expiresAt
    }
  }


  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return { locale, appearance, library, welcome, load, auth }
})
