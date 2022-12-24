import { ReviewCard, VerseId } from '@akdasa-studios/shlokas-core'
import { computed, ref } from 'vue'
import { ViewModel } from '@/app/DomainViewModel'
import { root } from '@/application'
import { ReviewCardVewModel } from './ReviewCardVewModel'


export class ReviewViewModel implements ViewModel {

  /* ---------------------------------- Cards --------------------------------- */
  public cards = ref<ReviewCardVewModel[]>([])
  public count = computed(() => this.cards.value.length)

  public revertLastAction() {
    root.app.processor.revert()
    root.inbox.sync()
  }

  /* -------------------------------------------------------------------------- */
  /*                                    Sync                                    */
  /* -------------------------------------------------------------------------- */

  public sync() {
    const getVerse = (verseId: VerseId) => {
      const result = root.app.library.getById(verseId)
      return result.value
    }
    const reviewCards = root.app.reviewDeck.dueToCards(root.app.timeMachine.now)

    this.cards.value = reviewCards.map(
      (card: ReviewCard) => new ReviewCardVewModel(card, getVerse(card.verseId))
    )
  }
}