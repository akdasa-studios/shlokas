import { defineStore } from 'pinia'
import { ref } from 'vue'

export const settingsKeys = [
  'language', 'showGradeButtons', 'colorfulCards',
  'welcomeDone', 'authToken', 'authSessionId', 'authStrategy',
  'authRefreshedAt', 'authExpiresAt', 'syncCollectionId', 'syncAt',
  'syncLibraryAt', 'reviewCardsInRandomOrder', 'showUnpublishedVerses',
  'hideControlsInLandscapeMode', 'enableNotifications', 'notificationTime',
  'showAppBadge', 'memorizationTime'
]


export const useSettingsStore = defineStore('settings', () => {
  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  // appearance
  const language = ref('') // language will be set in initLocale at app initialization
  const showGradeButtons = ref(true)
  const colorfulCards = ref(true)
  const reviewCardsInRandomOrder = ref(true)
  const showAppBadge = ref(false)

  // welcome
  const welcomeDone = ref(false)

  // auth
  const authToken = ref('')
  const authSessionId = ref('')
  const authStrategy = ref('')
  const authRefreshedAt = ref(0)
  const authExpiresAt = ref(0)
  const showUnpublishedVerses = ref(false)
  const hideControlsInLandscapeMode = ref(true)

  // sync
  const syncCollectionId =  ref('')
  const syncAt = ref(0)
  const syncLibraryAt = ref(0)

  // sadhana
  const enableNotifications = ref(false)
  const notificationTime = ref<Array<[number, number]>>([[7, 0]])
  const memorizationTime = ref(10)

  // Debug configs
  const showAccountControls = ref(true)
  const autoSyncOnLogin = ref(true)

  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return {
    language, showGradeButtons, colorfulCards, syncLibraryAt, welcomeDone,
    authToken, authSessionId, authStrategy, authRefreshedAt, authExpiresAt, syncCollectionId, syncAt,
    showAccountControls, autoSyncOnLogin, reviewCardsInRandomOrder, showUnpublishedVerses,
    hideControlsInLandscapeMode, enableNotifications, notificationTime, showAppBadge, memorizationTime
  }
})
