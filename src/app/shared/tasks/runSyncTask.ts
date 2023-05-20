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

  const syncTask = useSync()
  const emitter = useEmitter()


  /* -------------------------------------------------------------------------- */
  /*                                  Triggers                                  */
  /* -------------------------------------------------------------------------- */

  emitter.on('appStateChanged', async () => await onExecute())


  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  async function onExecute(): Promise<boolean> {
    return await syncTask.run()
  }
}
