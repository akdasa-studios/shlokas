import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import { useApplication, useDeviceStore, useLogger } from '@/app/shared'
import { useTutorialStore } from '@/app/tutorial'


/**
 * Saves tutorial state to device storage.
 *
 * Data saved:
 *  - Current tutorial step
 *  - Tutorial date
 */
export function useTutorialPersistenceTask() {

  /* -------------------------------------------------------------------------- */
  /*                                Dependencies                                */
  /* -------------------------------------------------------------------------- */

  const CURRENT_STEP_KEY = 'tutorial:step'
  const DATE_KEY         = 'tutorial:date'

  const logger        = useLogger('tutorial:persistence')
  const application   = useApplication()
  const tutorialStore = useTutorialStore()
  const deviceStore   = useDeviceStore()

  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const { currentStep } = storeToRefs(tutorialStore)


  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  async function run() {
    await load()

    watch([currentStep, application.now], onStateChanged)
  }


  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  async function onStateChanged() {
    await save()
  }


  /* -------------------------------------------------------------------------- */
  /*                                   Helpers                                  */
  /* -------------------------------------------------------------------------- */

  async function save() {
    logger.debug('Saving tutorial state')
    deviceStore.set(CURRENT_STEP_KEY, currentStep.value)
    if (application.currentContextName.value === 'tutorial') {
      deviceStore.set(DATE_KEY, application.now.value.getTime())
    }
  }

  async function load() {
    currentStep.value = (await deviceStore.get(CURRENT_STEP_KEY)) || 0
    const tutorialDate = await deviceStore.get(DATE_KEY)

    if (tutorialStore.isStarted && !tutorialStore.isCompleted) {
      logger.debug(`Tutorial resored ${currentStep.value} step and ${tutorialDate} date`)
      application.switchContextTo('tutorial')
      if (tutorialDate) { application.setTime(new Date(tutorialDate)) }
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return { run }
}
