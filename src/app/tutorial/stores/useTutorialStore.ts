import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { TutorialStep, TutorialSteps } from '../models/TutorialStep'



export const useTutorialStore = defineStore('tutorial', () => {

  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const enabled = ref(true)
  const currentStepIdx = ref(0)
  const currentStep = computed(() => steps.value[currentStepIdx.value])
  const steps = ref<TutorialStep[]>([])
  const isCompleted = computed(() => currentStepIdx.value >= TutorialSteps.TutorialEnd)


  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  function registerSteps(tutorialSteps: TutorialStep[]) {
    steps.value = tutorialSteps
  }

  function completeStep(step?: number) {
    if (currentStep.value?.onLeave) {
      currentStep.value.onLeave()
    }

    if (currentStepIdx.value === step || step === undefined) {
      currentStepIdx.value += 1
    }

    if (currentStep.value?.onEnter) {
      currentStep.value.onEnter()
    }
  }


  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return { currentStep: currentStepIdx, completeStep, registerSteps, steps, enabled, isCompleted }
})
