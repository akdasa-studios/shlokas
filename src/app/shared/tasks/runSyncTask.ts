import { EventEmitter2 } from 'eventemitter2'
import { useSyncTask } from '../composables/useSyncTask'

/**
 * Runs sync task on app state change
 * @param app Application instance
 * @param emitter Event emitter instance
 */
export function runSyncTask(
  emitter: EventEmitter2
) {
  /* -------------------------------------------------------------------------- */
  /*                                Dependencies                                */
  /* -------------------------------------------------------------------------- */

  const syncTask = useSyncTask()


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
