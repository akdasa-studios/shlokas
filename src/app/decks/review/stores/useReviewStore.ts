import { Application, ReviewCard, ReviewCardReviewed, ReviewGrade, VerseId } from '@akdasa-studios/shlokas-core'
import { defineStore } from 'pinia'
import { computed, markRaw, ref, Ref } from 'vue'
import { ReviewCardViewModel } from '../models/ReviewCardViewModel'


export function useReviewDeckStore(app: Application) {
  return defineStore('decks/review', () => {
    const cards: Ref<ReviewCardViewModel[]> = ref([])
    const count = computed(() => cards.value.length)

    /* -------------------------------------------------------------------------- */
    /*                                   Actions                                  */
    /* -------------------------------------------------------------------------- */

    async function refresh() {
      cards.value = await getCards()
    }

    async function reviewTopCard(grade: ReviewGrade) {
      const topCard = cards.value[0]

      await app.processor.execute(new ReviewCardReviewed(topCard.card, grade))

      if (topCard.card.dueTo.getTime() !== app.timeMachine.today.getTime()) {
        removeFromDeck()
      } else {
        putTopOnBottom()
      }
    }

    function putTopOnBottom() {
      const topCard = cards.value.find(x => x.index === 0)
      if (topCard) {
        topCard.index = cards.value.length
        cards.value.forEach(x => x.index--)
      }
    }

    function removeFromDeck() {
      const topCardIndex = cards.value.findIndex(x => x.index === 0)
      if (topCardIndex !== -1) {
        cards.value.filter(x => x.index > 0).forEach(x => x.index--)
        return cards.value.splice(topCardIndex, 1)[0]
      }
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Private                                  */
    /* -------------------------------------------------------------------------- */

    async function getCards() : Promise<ReviewCardViewModel[]> {
      const getVerse = async (verseId: VerseId) => {
        return (await app.library.getById(verseId)).value
      }

      const cards  = await app.reviewDeck.dueToCards(app.timeMachine.now)
      const sorted = Array.from(cards).sort((a, b) => a.addedAt.getTime() - b.addedAt.getTime())

      // TODO: should be sorting by date be extracted to shlokas-core?
      const viewModels = sorted.map(async (card: ReviewCard, index: number) => {
        return markRaw(new ReviewCardViewModel(card, await getVerse(card.verseId), index)) as ReviewCardViewModel
      })
      return await Promise.all(viewModels)
    }


    /* -------------------------------------------------------------------------- */
    /*                                  Interface                                 */
    /* -------------------------------------------------------------------------- */

    return { cards, count, refresh, reviewTopCard }
  })()
}
