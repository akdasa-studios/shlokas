import { log } from 'console'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { useDeviceStore, useLogger } from '@/app/shared'
import { useSettingsStore } from '@/app/settings'


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
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const {
    locale, appearance, library, welcome, auth
  } = storeToRefs(settingsStore)


  /* -------------------------------------------------------------------------- */
  /*                                  Triggers                                  */
  /* -------------------------------------------------------------------------- */

  watch([
    locale.value,
    appearance.value,
    library.value,
    welcome.value,
    auth.value
  ], onSettingsChanged)


  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  async function onSettingsChanged() {
    logger.debug('Saving settings state')
    await deviceStore.set('locale',     JSON.stringify(locale.value))
    await deviceStore.set('appearance', JSON.stringify(appearance.value))
    await deviceStore.set('library',    JSON.stringify(library.value))
    await deviceStore.set('welcome',    JSON.stringify(welcome.value))
    await deviceStore.set('auth',       JSON.stringify(auth.value))
  }
}
