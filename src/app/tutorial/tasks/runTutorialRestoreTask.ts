import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useDeviceStore, useApplication, useLogger } from '@/app/shared'
import { useTutorialStore } from '@/app/tutorial'
import { CURRENT_STEP_KEY, DATE_KEY } from './shared'


/**
 * Restores tutorial state from device storage once application context is changed to tutorial.
 *
 * Data restored:
 *  - Current tutorial step
 *  - Tutorial date
 */
export async function runTutorialRestoreTask() {

  /* -------------------------------------------------------------------------- */
  /*                                Dependencies                                */
  /* -------------------------------------------------------------------------- */

  const logger        = useLogger('tutorial:restore')
  const application   = useApplication()
  const tutorialStore = useTutorialStore()
  const deviceStore   = useDeviceStore()

  /* -------------------------------------------------------------------------- */
  /*                                    Watch                                   */
  /* -------------------------------------------------------------------------- */

  watch(application.currentContextName, onApplicationContextChanged)


  /* -------------------------------------------------------------------------- */
  /*                                 Init state                                 */
  /* -------------------------------------------------------------------------- */

  const { currentStep } = storeToRefs(tutorialStore)
  currentStep.value = (await deviceStore.get(CURRENT_STEP_KEY)) || 0
  logger.debug(`Started with ${currentStep.value} step`)
  if (tutorialStore.isStarted && !tutorialStore.isCompleted) {
    logger.debug('Switching to tutorial context')
    application.switchContextTo('tutorial')
  }


  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  async function onApplicationContextChanged(context: string) {
    if (context !== 'tutorial') { return }

    logger.debug('Restoring tutorial state')
    const tutorialDate = await deviceStore.get(DATE_KEY)
    if (tutorialDate) {
      logger.debug('Restored date', tutorialDate)
      application.setTime(new Date(tutorialDate))
    } else {
      logger.debug('No tutorial date saved')
    }
  }
}
