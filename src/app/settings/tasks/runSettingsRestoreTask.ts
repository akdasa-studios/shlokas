import { useDeviceStore, useLogger } from '@/app/shared'
import { useSettingsStore, settingsKeys } from '@/app/settings'


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
    for (const key of settingsKeys) {
      const value = await deviceStore.get(key)
      if (value === undefined || value === null) continue

      // @ts-ignore
      settingsStore[key] = JSON.parse(value)
    }
  }
}
