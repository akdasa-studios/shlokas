import { Application, ReviewCard, ReviewCardReviewed, ReviewGrade, VerseId } from '@akdasa-studios/shlokas-core'
import { defineStore } from 'pinia'
import { computed, markRaw, ref, Ref } from 'vue'
import { appendItem, removeItem, shiftItem } from "@/app/decks/shared"
import { ReviewCardViewModel } from '../viewModels/ReviewCardViewModel'


export function useReviewDeckStore(app: Application) {
  return defineStore('decks/review', () => {
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

    // async function refresh() {
    //   cards.value = await getCards()
    // }

    // async function reviewTopCard(grade: ReviewGrade) {
    //   const topCard = cards.value[0]

    //   await app.processor.execute(new ReviewCardReviewed(topCard.card, grade))

    //   if (topCard.card.dueTo.getTime() !== app.timeMachine.today.getTime()) {
    //     removeFromDeck()
    //   } else {
    //     putTopOnBottom()
    //   }
    // }

    // function putTopOnBottom() {
    //   const topCard = cards.value.find(x => x.index === 0)
    //   if (topCard) {
    //     topCard.index = cards.value.length
    //     cards.value.forEach(x => x.index--)
    //   }
    // }

    // function removeFromDeck() {
    //   const topCardIndex = cards.value.findIndex(x => x.index === 0)
    //   if (topCardIndex !== -1) {
    //     cards.value.filter(x => x.index > 0).forEach(x => x.index--)
    //     return cards.value.splice(topCardIndex, 1)[0]
    //   }
    // }


    /* -------------------------------------------------------------------------- */
    /*                                  Interface                                 */
    /* -------------------------------------------------------------------------- */

    return { cards, count, clear, addCard, shiftCard, removeCard }
  })()
}
