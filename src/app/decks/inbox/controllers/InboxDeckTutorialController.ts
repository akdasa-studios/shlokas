import { Emitter } from 'mitt'
import { useTutorialStore , TutorialCardViewModel } from '@/app/decks/shared'
import { useInboxDeckStore } from '@/app/decks/inbox'
import { Events } from '@/app/Events'


export class InboxDeckTutorialController {
  private readonly _inboxDeckStore
  private readonly _tutorialStore
  private readonly TUTORIAL_CARDS = [
    'inbox.cards',
    'inbox.overall',
    'inbox.verse',
    'inbox.final'
  ]

  constructor(emitter: Emitter<Events>) {
    this._inboxDeckStore = useInboxDeckStore()
    this._tutorialStore = useTutorialStore()
    emitter.on('appStateChanged', async () => await this.addTutorialCards())
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
   * and remove it from the Inbox deck.
   * @param card The card that has been swiped.
   */
  tutorialCardSwiped(card: TutorialCardViewModel) {
    this._tutorialStore.completeStep(card.id)
    this._inboxDeckStore.removeTopCard()
  }

  /**
   * Adds tutorial card to the Inbox deck.
   * @param id Id of the tutorial card.
   */
  private addTutorialCard(id: string) {
    const isAlreadyInInbox = this._inboxDeckStore.hasCard(id)
    const isCompleted      = this._tutorialStore.isStepCompleted(id)
    if (!isAlreadyInInbox && !isCompleted) {
      this._inboxDeckStore.addCard(new TutorialCardViewModel(id))
    }
  }
}