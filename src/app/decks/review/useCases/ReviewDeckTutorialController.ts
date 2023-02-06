import { Emitter } from 'mitt'
import { useReviewDeckStore } from '@/app/decks/review'
import { useTutorialStore , TutorialCardViewModel } from '@/app/decks/shared'
import { Events } from '@/app/Events'


export class ReviewDeckTutorialController {
  private readonly _reviewDeckStore
  private readonly _tutorialStore
  private readonly TUTORIAL_CARDS = [
    "review.questionAnswer",
    "review.intervals",
  ]

  constructor(emitter: Emitter<Events>) {
    this._reviewDeckStore = useReviewDeckStore()
    this._tutorialStore = useTutorialStore()
    emitter.on('appOpened', async () => await this.addTutorialCards())
  }

  /**
   * Adds tutorial cards to the Inbox deck
   */
  async addTutorialCards() {
    if (!this._tutorialStore.enabled) { return }
    this.TUTORIAL_CARDS.reverse().forEach(
      cardId => this.addTutorialCard(cardId)
    )
  }

  /**
   * Tutorial card has been swiped. Mark it is as completed
   * and remove it from the Review deck.
   * @param card The card that has been swiped.
   */
  tutorialCardSwiped(card: TutorialCardViewModel) {
    this._tutorialStore.completeStep(card.id)
    this._reviewDeckStore.removeTopCard()
  }

  /**
   * Adds tutorial card to the Review deck.
   * @param id Id of the tutorial card.
   */
  private addTutorialCard(id: string) {
    const isAlreadyInDeck = this._reviewDeckStore.hasCard(id)
    const isCompleted     = this._tutorialStore.isStepCompleted(id)
    if (!isAlreadyInDeck && !isCompleted) {
      this._reviewDeckStore.addCard(new TutorialCardViewModel(id))
    }
  }
}