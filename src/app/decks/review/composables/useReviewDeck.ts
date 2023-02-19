import { Application, ReviewCard, ReviewCardReviewed, ReviewGrade } from '@akdasa-studios/shlokas-core'
import { useArrayFilter, useArrayFind } from '@vueuse/core'
import { computed } from 'vue'
import { ReviewVerseCardViewModel, useReviewDeckStore } from '@/app/decks/review'


export function useReviewDeck(app: Application) {
  const reviewDeckStore = useReviewDeckStore()
  const cards   = useArrayFilter(reviewDeckStore.cards, x => x.index < 3)
  const topCard = useArrayFind(reviewDeckStore.cards, x => x.index === 0)
  const isEmpty = computed(() => reviewDeckStore.cards.length === 0)

  async function gradeTopCard(grade: ReviewGrade) {
    const topCard1 = (topCard.value as ReviewVerseCardViewModel).card as ReviewCard
    await app.processor.execute(new ReviewCardReviewed(topCard1, grade))

    if (topCard1.dueTo.getTime() !== app.timeMachine.today.getTime()) {
      reviewDeckStore.removeTopCard()
    } else {
      reviewDeckStore.shiftTopCard()
    }
  }

  return {
    gradeTopCard,
    isEmpty,
    cards,
    topCard,
  }
}