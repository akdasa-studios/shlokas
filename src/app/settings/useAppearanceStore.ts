import { defineStore } from 'pinia'
import { ref, watch } from 'vue'


interface Storage {
  get(key: string): Promise<any>
  set(key: string, value: any): Promise<any>
}


export function useAppearanceStore(storage: Storage) {
  const KEY_COLORFUL_CARDS = 'colorfulCards'
  const KEY_GRADE_BUTTONS = 'gradeButtons'

  return defineStore('settings/appearance', () => {
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
  })()
}