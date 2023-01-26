import { defineStore } from 'pinia'
import { computed, ref, Ref } from 'vue'
import { appendItem, removeItem, shiftItem } from "@/app/decks/shared"
import { ReviewCardViewModel } from '../viewModels/ReviewCardViewModel'


export const useReviewDeckStore = defineStore('decks/review', () => {
  const cards: Ref<ReviewCardViewModel[]> = ref([])
  const count = computed(() => cards.value.length)

  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  function clear() {
    cards.value = []
  }

  function addCard(card: ReviewCardViewModel) {
    appendItem(cards, card)
  }
  function shiftCard() {
    shiftItem(cards)
  }

  function removeCard(): ReviewCardViewModel | undefined {
    return removeItem(cards) as ReviewCardViewModel | undefined
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return { cards, count, clear, addCard, shiftCard, removeCard }
})