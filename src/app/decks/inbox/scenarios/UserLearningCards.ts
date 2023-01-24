import { Application, InboxCardMemorized, UpdateVerseStatus } from "@akdasa-studios/shlokas-core"
import { useLibraryStore } from '@/app/library'
import { useToast } from '@/app/composables'
import { useInboxDeckStore } from '@/app/decks/inbox'
import { useReviewDeckStore } from "../../review"

export class UserLearningCards {
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

  open() {
    this._inboxDeckStore.refresh()
  }

  async shiftCard() {
    this._inboxDeckStore.shiftCard()
  }

  async cardMemorized() {
    const card = this._inboxDeckStore.memorizeCard()
    if (card) {
      const inboxCard = card._card
      await this._app.processor.execute(new InboxCardMemorized(inboxCard))
      await this._app.processor.execute(new UpdateVerseStatus(inboxCard.verseId))
      await this._reviewDeckStore.refresh()

      const status = await this._libraryStore.getStatus(card.verseId)
      if (status) { await status.sync() }

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