import { useSettingsStore } from '@/app/settings'
import { useSync as useSync } from '../composables/useSync'
import { useEmitter } from '../composables/useEmitter'

/**
 * Runs sync task on app state change
 * @param app Application instance
 * @param emitter Event emitter instance
 */
export function runSyncTask() {
  /* -------------------------------------------------------------------------- */
  /*                                Dependencies                                */
  /* -------------------------------------------------------------------------- */

  const sync     = useSync()
  const emitter  = useEmitter()
  const settings = useSettingsStore()


  /* -------------------------------------------------------------------------- */
  /*                                  Triggers                                  */
  /* -------------------------------------------------------------------------- */

  emitter.on('appStateChanged', onSync)
  emitter.on('signedIn', onSignedIn)


  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  async function onSignedIn() {
    if (settings.auth.autoSyncOnLogin) {
      await onSync()
    }
  }

  async function onSync(): Promise<boolean> {
    return await sync.run()
  }
}
