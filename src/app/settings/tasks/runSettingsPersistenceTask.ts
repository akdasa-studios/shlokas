import { watch } from 'vue'
import { useDeviceStore, useLogger } from '@/app/shared'
import { useSettingsStore, settingsKeys } from '@/app/settings'


/**
 * Saves and restores settings state to device storage.
 */
export function useSettingsPersistenceTask() {

  /* -------------------------------------------------------------------------- */
  /*                                Dependencies                                */
  /* -------------------------------------------------------------------------- */

  const logger        = useLogger('settings')
  const settingsStore = useSettingsStore()
  const deviceStore   = useDeviceStore()

  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  /** Starts the task. */
  async function run() {
    await onLoadSettings()

    watch(settingsStore, onSettingsChanged)
  }


  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  async function onSettingsChanged() {
    logger.debug('Saving settings state')
    for (const key of settingsKeys) {
      // @ts-ignore
      const value = typeof settingsStore[key] === 'object' ? JSON.stringify(settingsStore[key]) : settingsStore[key]
      await deviceStore.set(key, value)
    }
  }

  async function onLoadSettings() {
    logger.debug('Restoring settings state')
    for (const key of settingsKeys) {
      // @ts-ignore
      const type  = typeof settingsStore[key]
      const value = await deviceStore.get(key)
      if (value === undefined || value === null) continue

      // @ts-ignore
      // Note: load scalar values as is, and objects as JSON strings
      settingsStore[key] = type === 'object' ? JSON.parse(value) : value
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return { run }
}
