import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { useApplication, useDeviceStore, useLogger } from '@/app/shared'
import { useTutorialStore } from '@/app/tutorial'
import { CURRENT_STEP_KEY, DATE_KEY } from './shared'


/**
 * Saves tutorial state to device storage.
 *
 * Data saved:
 *  - Current tutorial step
 *  - Tutorial date
 */
export async function runTutorialPersistenceTask() {

  /* -------------------------------------------------------------------------- */
  /*                                Dependencies                                */
  /* -------------------------------------------------------------------------- */

  const log = useLogger('tutorial:persistence')
  const application = useApplication()
  const tutorialStore = useTutorialStore()
  const deviceStorage = useDeviceStore()


  /* -------------------------------------------------------------------------- */
  /*                                 Init state                                 */
  /* -------------------------------------------------------------------------- */

  const { currentStep } = storeToRefs(tutorialStore)


  /* -------------------------------------------------------------------------- */
  /*                                    Watch                                   */
  /* -------------------------------------------------------------------------- */

  watch(currentStep, onTutorialStepChanged)
  watch(application.now, onDateChanged)


  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  function onTutorialStepChanged(value: number) {
    log.debug(`Saving step ${value}`)
    deviceStorage.set(CURRENT_STEP_KEY, value)
  }

  function onDateChanged(value: Date) {
    if (application.currentContextName.value === 'tutorial') {
      log.debug(`Saving date ${value}`)
      deviceStorage.set(DATE_KEY, value.getTime())
    }
  }
}
