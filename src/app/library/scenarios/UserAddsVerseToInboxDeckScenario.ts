import { Transaction } from '@akdasa-studios/framework'
import { AddVerseToInboxDeck, Application, UpdateVerseStatus } from "@akdasa-studios/shlokas-core"
import { useDialog, useToast } from "@/app/composables"
import { useInboxDeckStore } from "@/app/decks/inbox"
import { LibraryVerse, DummyLibraryVerse } from '@/app/library'


export class UserAddsVerseToInboxDeckScenario {
  private _app: Application
  private _addedVerse: LibraryVerse = DummyLibraryVerse
  private _inboxDeck
  private _toast
  private _dialog

  constructor(app: Application) {
    this._app = app
    this._inboxDeck = useInboxDeckStore(app)
    this._toast = useToast()
    this._dialog = useDialog<LibraryVerse>(DummyLibraryVerse)
  }

  async addVerseToInbox(verse: LibraryVerse) {
    this._addedVerse = verse

    this._toast.open({data: { verseNumber: verse.number }})

    const transaction = new Transaction()
    await this._app.processor.execute(new AddVerseToInboxDeck(verse.verseId), transaction)
    await this._app.processor.execute(new UpdateVerseStatus(verse.verseId), transaction)
    await verse.sync()
    await this._inboxDeck.refresh()
  }

  /* -------------------------------------------------------------------------- */
  /*                           User can revert changes                          */
  /* -------------------------------------------------------------------------- */

  async revert() {
    if (!this._addedVerse) { return }
    await this._app.processor.revert()
    await this._addedVerse.sync()
    await this._inboxDeck.refresh()
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Properties                                 */
  /* -------------------------------------------------------------------------- */

  get dialog() {
    return this._dialog
  }

  get toast() {
    return this._toast
  }
}