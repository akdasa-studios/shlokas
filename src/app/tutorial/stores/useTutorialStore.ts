import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
// import { useDeviceStore } from '@/app/useDeviceStorage'

export interface TutorialButton {
  id: string
  text: string
  color: string
}

export interface TutorialStep {
  id: number
  text: string
  actionText?: string
  position?: string
  duration?: number
  buttons?: TutorialButton[]
  onButtonClicked?: (buttonId: string) => void
  onTimeout?: () => void
  onLeave?: () => void
  onEnter?: () => void
}


export const useTutorialStore = defineStore('tutorial', () => {
  // const storage = useDeviceStore()

  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const enabled = ref(true)
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

  return { currentStep: currentStepIdx, completeStep, registerSteps, steps, enabled }
})
