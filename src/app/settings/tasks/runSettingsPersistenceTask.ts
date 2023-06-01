import { watch } from 'vue'
import { useDeviceStore, useLogger } from '@/app/shared'
import { useSettingsStore, settingsKeys } from '@/app/settings'


/**
 * Saves settings state to device storage.
 */
export function runSettingsPersistenceTask() {

  /* -------------------------------------------------------------------------- */
  /*                                Dependencies                                */
  /* -------------------------------------------------------------------------- */

  const logger        = useLogger('settings:persistence')
  const settingsStore = useSettingsStore()
  const deviceStore   = useDeviceStore()

  /* -------------------------------------------------------------------------- */
  /*                                  Triggers                                  */
  /* -------------------------------------------------------------------------- */

  watch(settingsStore, onSettingsChanged)


  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  async function onSettingsChanged() {
    logger.debug('Saving settings state')
    for (const key of settingsKeys) {
      // @ts-ignore
      await deviceStore.set(key, settingsStore[key])
    }
  }
}
