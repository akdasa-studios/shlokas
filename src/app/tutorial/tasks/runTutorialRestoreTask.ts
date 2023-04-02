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

  const log = useLogger('tutorial:restore')
  const application = useApplication()
  const tutorialStore = useTutorialStore()
  const deviceStorage = useDeviceStore()

  /* -------------------------------------------------------------------------- */
  /*                                    Watch                                   */
  /* -------------------------------------------------------------------------- */

  watch(application.currentContextName, onApplicationContextChanged)


  /* -------------------------------------------------------------------------- */
  /*                                 Init state                                 */
  /* -------------------------------------------------------------------------- */

  const { currentStep } = storeToRefs(tutorialStore)
  currentStep.value = (await deviceStorage.get(CURRENT_STEP_KEY)) || 0
  log.debug(`Started with ${currentStep.value} step`)
  if (tutorialStore.isStarted && !tutorialStore.isCompleted) {
    log.debug('Switching to tutorial context')
    application.switchContextTo('tutorial')
  }


  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  async function onApplicationContextChanged(context: string) {
    if (context !== 'tutorial') { return }

    log.debug('Restoring tutorial state')
    const tutorialDate = await deviceStorage.get(DATE_KEY)
    if (tutorialDate) {
      log.debug('Restored date', tutorialDate)
      application.setTime(new Date(tutorialDate))
    } else {
      log.debug('No tutorial date saved')
    }
  }
}
