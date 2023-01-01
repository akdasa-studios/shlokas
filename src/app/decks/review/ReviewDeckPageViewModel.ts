import { ReviewCard, ReviewCardReviewed, ReviewGrade, VerseId } from '@akdasa-studios/shlokas-core'
import { computed, markRaw, Ref, ref } from 'vue'
import { ApplicationViewModel } from '@/app/ApplicationViewModel'
import { ViewModel } from '@/app/DomainViewModel'
import { ReviewCardViewModel } from './cards/ReviewCardViewModel'


export class ReviewDeckPageViewModel extends ViewModel {
  constructor(private readonly shlokas: ApplicationViewModel) {
    super()
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Properties                                 */
  /* -------------------------------------------------------------------------- */

  public cards: Ref<ReviewCardViewModel[]> = ref([])
  public count = computed(() => this.cards.value.length)

  async reviewTopCard(grade: ReviewGrade) {
    const topCard = this.cards.value[0]

    await this.shlokas.execute(
      new ReviewCardReviewed(topCard.card, grade)
    )

    if (topCard.card.dueTo.getTime() !== this.shlokas.app.timeMachine.today.getTime()) {
      this.cards.value.shift()
    } else {
      const first = this.cards.value.shift()
      if (first) { this.cards.value.push(first) }
    }
  }


  /* -------------------------------------------------------------------------- */
  /*                                    Sync                                    */
  /* -------------------------------------------------------------------------- */

  async sync() {
    const getVerse = async (verseId: VerseId) => {
      return (await this.shlokas.app.library.getById(verseId)).value
    }
    const reviewCards = await this.shlokas.app.reviewDeck.dueToCards(
      this.shlokas.app.timeMachine.now
    )

    this.cards.value = await Promise.all(
        reviewCards.map(async (card: ReviewCard) => {
          return markRaw(
            new ReviewCardViewModel(card, await getVerse(card.verseId))
          ) as ReviewCardViewModel
        })
      )
  }
}