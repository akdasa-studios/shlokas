import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStateStore, useDeviceStore, useLogger } from '@/app/shared'

const settingsKeys = [
  'memorizationTimeSpend', 'memorizationTimeResetAt'
]

/**
 * Saves and restores application state
 */
export function useAppStatePersistenceTask() {

  /* -------------------------------------------------------------------------- */
  /*                                Dependencies                                */
  /* -------------------------------------------------------------------------- */

  const logger        = useLogger('appState')
  const appStateStore = useAppStateStore()
  const deviceStore   = useDeviceStore()


  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const { isActive } = storeToRefs(appStateStore)

  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  /** Starts the task. */
  async function run() {
    await onLoadAppState()

    watch(isActive, onAppStateChanged)
  }


  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  async function onAppStateChanged() {
    if (isActive.value) { return }
    logger.debug('Saving app state')
    for (const key of settingsKeys) {
      // @ts-ignore
      const value = typeof appStateStore[key] === 'object' ? JSON.stringify(appStateStore[key]) : appStateStore[key]
      await deviceStore.set(key, value)
    }
  }

  async function onLoadAppState() {
    logger.debug('Restoring app state')
    for (const key of settingsKeys) {
      // @ts-ignore
      const type  = typeof appStateStore[key]
      const value = await deviceStore.get(key)
      if (value === undefined || value === null) continue

      // @ts-ignore
      // Note: load scalar values as is, and objects as JSON strings
      appStateStore[key] = type === 'object' ? JSON.parse(value) : value
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return { run }
}
