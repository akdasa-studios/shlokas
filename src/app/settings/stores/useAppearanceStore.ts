import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useDeviceStore } from '@/app/useDeviceStorage'


export const useAppearanceStore = defineStore('settings/appearance', () => {
  const KEY_COLORFUL_CARDS = 'colorfulCards'
  const KEY_GRADE_BUTTONS = 'gradeButtons'
  const storage = useDeviceStore()

  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const colorfulCards = ref(false)
  const gradeButtons = ref(false)

  watch(colorfulCards, onColorfulCardsChanged)
  watch(gradeButtons, onGradeButtonsChanged)

  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  async function load() {
    colorfulCards.value = await storage.get(KEY_COLORFUL_CARDS)
    gradeButtons.value = await storage.get(KEY_GRADE_BUTTONS)
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Private                                  */
  /* -------------------------------------------------------------------------- */

  async function onColorfulCardsChanged(value: boolean) {
    await storage.set(KEY_COLORFUL_CARDS, value)
  }

  async function onGradeButtonsChanged(value: boolean) {
    await storage.set(KEY_GRADE_BUTTONS, value)
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return { colorfulCards, gradeButtons, load }
})