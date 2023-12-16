import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { TutorialSteps } from '@/app/tutorial'


export const useTutorialStore = defineStore('tutorial', () => {

  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  /** Tutorial module could be enabled or disabled at all */
  const isEnabled = ref(true)

  /** Tutorial enabled, but not started yet */
  const isNotStartedYet = computed(
    () => isEnabled.value
          && currentStep.value === TutorialSteps.OverallIntroduction)

  /** Is tutorial enabled and it is in progress? */
  const inProgress = computed(
    () => isEnabled.value
          && currentStep.value > TutorialSteps.OverallIntroduction
          && currentStep.value < TutorialSteps.TutorialEnd)


  /** Current step */
  const currentStep = ref<TutorialSteps>(0)

  /** Last user's action was invalid */
  const lastInvalidActionAt = ref(0)


  /* -------------------------------------------------------------------------- */
  /*                                   Getters                                  */
  /* -------------------------------------------------------------------------- */

  /**
   * Check if a user is at a specified step of the tutorial
   * @param step Step number
   * @returns True if the tutorial is enabled and a user is at the specified step
   */
  function atStep(step: TutorialSteps) {
    return inProgress.value && currentStep.value === step
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

  return {
    isEnabled,
    isNotStartedYet,
    inProgress,
    currentStep,
    atStep,
    lastInvalidActionAt,
    completeStep,
    invalidAction,
  }
})
