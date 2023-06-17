import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '@/app/settings'
import { useSync } from '../composables/useSync'
import { useAppStateStore } from '../stores/appStateStore'

/**
 * Syncronisation task. Runs sync on app state change and on login.
 */
export function useSyncTask() {
  /* -------------------------------------------------------------------------- */
  /*                                Dependencies                                */
  /* -------------------------------------------------------------------------- */

  const sync          = useSync()
  const settingsStore = useSettingsStore()
  const appStateStore = useAppStateStore()


  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const { isActive } = storeToRefs(appStateStore)
  const { authSessionId, autoSyncOnLogin } = storeToRefs(settingsStore)


  /* -------------------------------------------------------------------------- */
  /*                                  Triggers                                  */
  /* -------------------------------------------------------------------------- */

  async function run() {
    watch([isActive, authSessionId], onStateChanaged)
  }


  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  async function onStateChanaged() {
    // Do not sync on app close, because database maybe closed already
    // and sync will fail
    const shouldSync = isActive.value && autoSyncOnLogin.value
    if (shouldSync) { await sync.run() }
  }


  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return { run }
}
