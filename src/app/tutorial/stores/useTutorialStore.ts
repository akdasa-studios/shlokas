import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { TutorialSteps } from '@/app/tutorial'


export const useTutorialStore = defineStore('tutorial', () => {

  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const currentStep = ref(0)
  const isEnabled = ref(true)
  const isCompleted = computed(() => currentStep.value >= TutorialSteps.TutorialEnd)
  const isStarted = computed(() => currentStep.value > TutorialSteps.OverallIntroduction)


  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  async function completeStep(step: number|undefined) {
    if (currentStep.value === step || step === undefined) {
      currentStep.value += 1
    }
  }


  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return { currentStep, completeStep, isEnabled, isCompleted, isStarted }
})
