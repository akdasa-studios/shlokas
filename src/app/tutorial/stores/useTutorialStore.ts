import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { TutorialSteps } from '@/app/tutorial'


export const useTutorialStore = defineStore('tutorial', () => {

  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const currentStep = ref(0)
  const isEnabled = ref(true)
  const inProgress = computed(
    () => currentStep.value > TutorialSteps.OverallIntroduction &&
          currentStep.value < TutorialSteps.TutorialEnd)
  const lastInvalidActionAt = ref(0)

  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  /**
   * Check if a user is at a specified step of the tutorial
   * @param step Step number
   * @returns True if the tutorial is enabled and a user is at the specified step
   */
  function atStep(step: TutorialSteps) {
    return isEnabled.value && currentStep.value === step
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  function completeStep(step: number|undefined) {
    if (currentStep.value === step || step === undefined) {
      currentStep.value += 1
    }
  }

  /**
   * User performed an invalid action
   */
  function invalidAction() {
    lastInvalidActionAt.value = new Date().getTime()
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return { currentStep, completeStep, isEnabled, inProgress, invalidAction, lastInvalidActionAt, atStep }
})
