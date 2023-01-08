import { Application, ReviewCard, ReviewCardReviewed, ReviewGrade, VerseId } from '@akdasa-studios/shlokas-core'
import { defineStore } from 'pinia'
import { computed, markRaw, ref, Ref } from 'vue'
import { ReviewCardViewModel } from './cards/ReviewCardViewModel'


export function useReviewDeckStore(app: Application) {
  return defineStore('reviewDeck', () => {
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
        cards.value.shift()
      } else {
        const first = cards.value.shift()
        if (first) { cards.value.push(first) }
      }
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Private                                  */
    /* -------------------------------------------------------------------------- */

    async function getCards() : Promise<ReviewCardViewModel[]> {
      const getVerse = async (verseId: VerseId) => {
        return (await app.library.getById(verseId)).value
      }

      const cards = await app.reviewDeck.dueToCards(
        app.timeMachine.now
      )
      const viewModels = cards.map(async (card: ReviewCard) => {
        return markRaw(new ReviewCardViewModel(card, await getVerse(card.verseId)))
      })

      return await Promise.all(viewModels)
    }


    /* -------------------------------------------------------------------------- */
    /*                                  Interface                                 */
    /* -------------------------------------------------------------------------- */

    return { cards, count, refresh, reviewTopCard }
  })()
}
