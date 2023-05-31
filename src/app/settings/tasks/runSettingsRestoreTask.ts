import { useDeviceStore, useLogger } from '@/app/shared'
import { useSettingsStore } from '@/app/settings'


/**
 * Restores tutorial state from device storage once application context is changed to tutorial.
 */
export async function runSettingsRestoreTask() {

  /* -------------------------------------------------------------------------- */
  /*                                Dependencies                                */
  /* -------------------------------------------------------------------------- */

  const logger        = useLogger('settings:restore')
  const settingsStore = useSettingsStore()
  const deviceStore   = useDeviceStore()


  /* -------------------------------------------------------------------------- */
  /*                                    Init                                    */
  /* -------------------------------------------------------------------------- */

  await onRestore() // Load settings immediately


  /* -------------------------------------------------------------------------- */
  /*                                   Handlers                                 */
  /* -------------------------------------------------------------------------- */

  async function onRestore() {
    logger.debug('Restoring settings state')
    const loadedLocale     = JSON.parse(await deviceStore.get('locale'))
    const loadedAppearance = JSON.parse(await deviceStore.get('appearance'))
    const loadedLibrary    = JSON.parse(await deviceStore.get('library'))
    const loadedWelcome    = JSON.parse(await deviceStore.get('welcome'))
    const loadedAuth       = JSON.parse(await deviceStore.get('auth'))
    const loadedSync       = JSON.parse(await deviceStore.get('sync'))

    if (loadedLocale) {
      settingsStore.locale.language = loadedLocale.language
    }
    if (loadedAppearance) {
      settingsStore.appearance.gradeButtons  = loadedAppearance.gradeButtons
      settingsStore.appearance.colorfulCards = loadedAppearance.colorfulCards
    }
    if (loadedLibrary) {
      settingsStore.library.lastSyncDate = loadedLibrary.lastSyncDate
    }
    if (loadedWelcome) {
      settingsStore.welcome.done = loadedWelcome.done
    }
    if (loadedAuth) {
      settingsStore.auth.collectionId = loadedAuth.collectionId
      settingsStore.auth.token = loadedAuth.token
      settingsStore.auth.sessionId = loadedAuth.sessionId
      settingsStore.auth.strategy = loadedAuth.strategy
      settingsStore.auth.refreshedAt = loadedAuth.refreshedAt
      settingsStore.auth.expiresAt = loadedAuth.expiresAt
      settingsStore.auth.autoSyncOnLogin = loadedAuth.autoSyncOnLogin
    }
    if (loadedSync) {
      settingsStore.sync.lastSyncTime = loadedSync.lastSyncTime
    }
  }
}
