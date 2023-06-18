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
export function runTutorialPersistenceTask() {

  /* -------------------------------------------------------------------------- */
  /*                                Dependencies                                */
  /* -------------------------------------------------------------------------- */

  const logger        = useLogger('tutorial:persistence')
  const application   = useApplication()
  const tutorialStore = useTutorialStore()
  const deviceStore   = useDeviceStore()

  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const { currentStep } = storeToRefs(tutorialStore)


  /* -------------------------------------------------------------------------- */
  /*                                  Triggers                                  */
  /* -------------------------------------------------------------------------- */

  watch(currentStep, onTutorialStepChanged)
  watch(application.now, onDateChanged)


  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  function onTutorialStepChanged(value: number) {
    logger.debug(`Saving step ${value}`)
    deviceStore.set(CURRENT_STEP_KEY, value)
  }

  function onDateChanged(value: Date) {
    if (application.currentContextName.value === 'tutorial') {
      logger.debug(`Saving date ${value}`)
      deviceStore.set(DATE_KEY, value.getTime())
    }
  }
}