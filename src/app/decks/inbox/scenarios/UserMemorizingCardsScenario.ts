import { Application, InboxCard, InboxCardMemorized, UpdateVerseStatus } from "@akdasa-studios/shlokas-core"
import { useLibraryStore } from '@/app/library'
import { useToast } from '@/app/composables'
import { InboxVerseCardViewModel, useInboxDeckStore } from '@/app/decks/inbox'
import { useReviewDeckStore } from '@/app/decks/review'

export class UserMemorizingCardsScenario {
  private readonly _app: Application
  private readonly _inboxDeckStore
  private readonly _reviewDeckStore
  private readonly _libraryStore
  private readonly _cardMemorizedToast

  constructor(app: Application) {
    this._app = app
    this._inboxDeckStore = useInboxDeckStore(this._app)
    this._reviewDeckStore = useReviewDeckStore(this._app)
    this._libraryStore = useLibraryStore(this._app)
    this._cardMemorizedToast = useToast()
  }

  async open() {
    const cards = await this._app.inboxDeck.cards()
    const viewModels = cards.map(async (card: InboxCard) =>
      new InboxVerseCardViewModel(card, await this._libraryStore.getVerse(card.verseId))
    )
    const cvm = await Promise.all(viewModels)
    cvm.forEach(x => this._inboxDeckStore.addCard(x))
  }

  async shiftCard() {
    this._inboxDeckStore.shiftCard()
  }

  async removeCard() {
    this._inboxDeckStore.removeCard()
  }

  async cardMemorized() {
    const card = this._inboxDeckStore.removeCard()
    if (card && card instanceof InboxVerseCardViewModel) {
      const inboxCard = card._card
      await this._app.processor.execute(new InboxCardMemorized(inboxCard))
      await this._app.processor.execute(new UpdateVerseStatus(inboxCard.verseId))
      await this._reviewDeckStore.refresh()
      this._libraryStore.sync(card.verseId)
      this._cardMemorizedToast.open()
    }
  }

  async revert() {
    await this._app.processor.revert()
  }

  get count() { return this._inboxDeckStore.count }
  get cards() { return this._inboxDeckStore.cards }

  get cardMemorizedToast() { return this._cardMemorizedToast }
}