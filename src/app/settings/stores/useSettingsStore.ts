import { defineStore } from 'pinia'
import { ref } from 'vue'


interface LocaleSettings {
  language: string
}

interface AppearanceSettings {
  gradeButtons: boolean
  colorfulCards: boolean
  accountControls: boolean
}

interface LibrarySettings {
  lastSyncDate: number
}

interface WelcomeSettings {
  done: boolean
}

interface AuthSettings {
  autoSyncOnLogin: boolean
  token: string
  collectionId: string
  sessionId: string
  strategy: string
  refreshedAt?: number
  expiresAt?: number
}

export const useSettingsStore = defineStore('settings', () => {
  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const locale = ref<LocaleSettings>({
    language: 'en' // language will be set in initLocale at app initialization
  })

  const appearance = ref<AppearanceSettings>({
    gradeButtons: true,
    colorfulCards: true,
    accountControls: true
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
    expiresAt: 0,
    autoSyncOnLogin: true
  })

  const sync = ref({
    lastSyncTime: 0,
  })

  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return { locale, appearance, library, welcome, auth, sync }
})
