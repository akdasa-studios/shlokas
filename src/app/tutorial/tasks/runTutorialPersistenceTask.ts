import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useDeviceStore } from '@/app/useDeviceStorage'
import { useLogger } from '@/app/shared'
import { useTutorialStore } from '../stores/useTutorialStore'


export async function runTutorialPersistenceTask() {
  const CURRENT_STEP_KEY = 'tutorial:step'

  /* -------------------------------------------------------------------------- */
  /*                                Dependencies                                */
  /* -------------------------------------------------------------------------- */

  const log = useLogger('tutorial:saveTask')
  const tutorialStore = useTutorialStore()
  const deviceStorage = useDeviceStore()


  /* -------------------------------------------------------------------------- */
  /*                                 Init state                                 */
  /* -------------------------------------------------------------------------- */

  const { currentStep } = storeToRefs(tutorialStore)
  currentStep.value = (await deviceStorage.get(CURRENT_STEP_KEY)) || 0
  log.debug(`Started with ${currentStep.value} step`)


  /* -------------------------------------------------------------------------- */
  /*                                    Watch                                   */
  /* -------------------------------------------------------------------------- */

  watch(currentStep, onTutorialStepChanged)


  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  function onTutorialStepChanged(value: number) {
    log.debug(`Saving step ${value}`)
    deviceStorage.set(CURRENT_STEP_KEY, value)
  }
}
