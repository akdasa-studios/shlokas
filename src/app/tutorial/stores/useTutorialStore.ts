import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
// import { useDeviceStore } from '@/app/useDeviceStorage'

export interface TutorialStep {
  id: number
  text: string
  actionText?: string
  position?: string
  onLeave?: () => void
  onEnter?: () => void
}


export const useTutorialStore = defineStore('tutorial', () => {
  // const storage = useDeviceStore()

  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const currentStepIdx = ref(0)
  const currentStep = computed(() => steps.value[currentStepIdx.value])
  const steps = ref<TutorialStep[]>([])


  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  function registerSteps(tutorialSteps: TutorialStep[]) {
    steps.value = tutorialSteps
  }

  function completeStep(step?: number) {
    console.log('completeStep', step, currentStepIdx.value)

    if (currentStep.value.onLeave) {
      currentStep.value.onLeave()
    }

    if (currentStepIdx.value === step || step === undefined) {
      currentStepIdx.value += 1
    }

    if (currentStep.value.onEnter) {
      currentStep.value.onEnter()
    }
  }


  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return { currentStep: currentStepIdx, completeStep, registerSteps, steps }
})
