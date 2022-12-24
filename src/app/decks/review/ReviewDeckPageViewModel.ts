import { ReviewCard, VerseId } from '@akdasa-studios/shlokas-core'
import { computed, ref } from 'vue'
import { ViewModel } from '@/app/DomainViewModel'
import { shlokas } from '@/application'
import { ReviewCardViewModel } from './cards/ReviewCardViewModel'


export class ReviewDeckPageViewModel implements ViewModel {

  /* ---------------------------------- Cards --------------------------------- */
  public cards = ref<ReviewCardViewModel[]>([])
  public count = computed(() => this.cards.value.length)

  public revertLastAction() {
    shlokas.app.processor.revert()
    shlokas.inboxDeck.sync()
  }

  /* -------------------------------------------------------------------------- */
  /*                                    Sync                                    */
  /* -------------------------------------------------------------------------- */

  public sync() {
    const getVerse = (verseId: VerseId) => {
      const result = shlokas.app.library.getById(verseId)
      return result.value
    }
    const reviewCards = shlokas.app.reviewDeck.dueToCards(shlokas.app.timeMachine.now)

    this.cards.value = reviewCards.map(
      (card: ReviewCard) => new ReviewCardViewModel(card, getVerse(card.verseId))
    )
  }
}