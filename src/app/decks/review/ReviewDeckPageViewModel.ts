import { ReviewCard, VerseId } from '@akdasa-studios/shlokas-core'
import { computed, markRaw, Ref, ref } from 'vue'
import { ViewModel } from '@/app/DomainViewModel'
import { ApplicationViewModel } from '@/app/ApplicationViewModel'
import { ReviewCardViewModel } from './cards/ReviewCardViewModel'


export class ReviewDeckPageViewModel extends ViewModel {
  constructor(private readonly shlokas: ApplicationViewModel) {
    super()
  }

  public cards: Ref<ReviewCardViewModel[]> = ref([])
  public count = computed(() => this.cards.value.length)

  /* -------------------------------------------------------------------------- */
  /*                                    Sync                                    */
  /* -------------------------------------------------------------------------- */

  public sync() {
    const getVerse = (verseId: VerseId) => {
      return this.shlokas.app.library.getById(verseId).value
    }
    const reviewCards = this.shlokas.app.reviewDeck.dueToCards(
      this.shlokas.app.timeMachine.now
    )

    this.cards.value = reviewCards.map(
      (card: ReviewCard) => markRaw(new ReviewCardViewModel(card, getVerse(card.verseId)))
    )
  }
}