import { Transaction } from '@akdasa-studios/framework'
import { AddVerseToInboxDeck, Application, UpdateVerseStatus, VerseId } from "@akdasa-studios/shlokas-core"
import { useDialog, useToast } from "@/app/composables"
import { DummyLibraryVerse, LibraryVerse } from '@/app/library'


export class AddVerseToInboxDeckUseCase {
  private _app: Application
  private _addedVerseId: VerseId|undefined
  private _toast
  private _dialog

  constructor(app: Application) {
    this._app = app
    this._toast = useToast()
    this._dialog = useDialog<LibraryVerse>(DummyLibraryVerse)
  }

  async addVerseToInbox(verse: LibraryVerse) {
    this._addedVerseId = verse.verseId

    this._toast.open({data: { verseNumber: verse.number }})

    const transaction = new Transaction()
    await this._app.processor.execute(new AddVerseToInboxDeck(verse.verseId), transaction)
    await this._app.processor.execute(new UpdateVerseStatus(verse.verseId), transaction)
  }

  /* -------------------------------------------------------------------------- */
  /*                           User can revert changes                          */
  /* -------------------------------------------------------------------------- */

  async revert() {
    if (!this._addedVerseId) { return }
    await this._app.processor.revert()
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