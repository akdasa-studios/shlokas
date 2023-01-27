import { Application } from "@akdasa-studios/shlokas-core"
import { useTutorialStore , TutorialCardViewModel } from '@/app/decks/shared'
import { useInboxDeckStore } from '@/app/decks/inbox'

export class InboxDeckTutorialUseCase {
  private readonly _app: Application
  private readonly _inboxDeckStore
  private readonly _tutorialStore

  constructor(app: Application) {
    this._app = app
    this._inboxDeckStore = useInboxDeckStore()
    this._tutorialStore = useTutorialStore()
  }

  async open() {
    console.log("enbld", this._tutorialStore.enabled)
    if (!this._tutorialStore.enabled) { return }
    const count = await this._app.inboxDeck.cardsCount()
    if (count > 0) {
      this.addCard("inbox.final")
      this.addCard("inbox.verse")
      this.addCard("inbox.overall")
      this.addCard("inbox.cards")
    }
  }

  cardSwiped(card: TutorialCardViewModel) {
    this._tutorialStore.completedSteps.push(card.id)
  }

  private addCard(id: string) {
    const inDeck = this._inboxDeckStore.cards.find(x => x.id === id)
    const isCompleted = this._tutorialStore.completedSteps.includes(id)
    if (!inDeck && !isCompleted) {
      this._inboxDeckStore.addCard(new TutorialCardViewModel(id))
    }
  }
}