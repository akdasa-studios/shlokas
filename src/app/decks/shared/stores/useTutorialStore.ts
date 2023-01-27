import { defineStore } from 'pinia'
import { Ref, ref, watch } from 'vue'
import { useDeviceStore } from '@/app/useDeviceStorage'


export const useTutorialStore = defineStore('settings/tutorial', () => {
  const TUTORIAL_COMPLETED_STEPS = 'tutorialCompletedSteps'
  const TUTORIAL_ENABLED = 'tutorialEnabled'
  const storage = useDeviceStore()

  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const completedSteps: Ref<string[]> = ref([])
  const enabled = ref(true)

  watch(completedSteps, onCompletedCardsChanged, { deep: true })
  watch(enabled, onEnabledChanged)

  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  async function load() {
    const storedValue = await storage.get(TUTORIAL_COMPLETED_STEPS)
    completedSteps.value = JSON.parse(storedValue || "[]")
    enabled.value = (await storage.get(TUTORIAL_ENABLED)) || true
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Private                                  */
  /* -------------------------------------------------------------------------- */

  async function onCompletedCardsChanged(value: string[]) {
    await storage.set(TUTORIAL_COMPLETED_STEPS, JSON.stringify(value))
  }

  async function onEnabledChanged(value: boolean) {
    await storage.set(TUTORIAL_ENABLED, value)
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return { completedSteps, load, enabled }
})