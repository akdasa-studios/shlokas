import { Transaction } from '@akdasa-studios/framework'
import { AddVerseToInboxDeck, Application, UpdateVerseStatus } from "@akdasa-studios/shlokas-core"
import { ComposerTranslation, useI18n } from "vue-i18n"
import { useDialog, useToast } from "@/app/composables"
import { useInboxDeckStore } from "@/app/decks/inbox"
import { LibraryVerse } from '@/app/library'
import { DummyLibraryVerse } from "../models/DummyLibraryVerse"


export class UserAddsVerseToInboxDeck {
  private _app: Application
  private _t: ComposerTranslation
  private _addedVerse: LibraryVerse = DummyLibraryVerse
  private _inboxDeck
  private _toast
  private _dialog

  constructor(app: Application) {
    this._app = app
    this._inboxDeck = useInboxDeckStore(app)
    this._toast = useToast()
    this._dialog = useDialog<LibraryVerse>(DummyLibraryVerse)
    this._t = useI18n().t
  }

  /* -------------------------------------------------------------------------- */
  /*           Step 1: User clicks on the verse and opens verse dialog          */
  /* -------------------------------------------------------------------------- */

  openVerseDialog(verse: LibraryVerse) {
    this._dialog.open(verse)
  }

  /* -------------------------------------------------------------------------- */
  /*                  Step 2: User adds verse to the inbox deck                 */
  /* -------------------------------------------------------------------------- */

  async addVerseToInbox(verse: LibraryVerse) {
    this._addedVerse = verse

    this._toast.open(this._t('decks.inbox.verseAdded', { verseNumber: verse.number }))

    const transaction = new Transaction()
    await this._app.processor.execute(new AddVerseToInboxDeck(verse.verseId), transaction)
    await this._app.processor.execute(new UpdateVerseStatus(verse.verseId), transaction)
    await verse.sync()
    await this._inboxDeck.refresh()
  }

  /* -------------------------------------------------------------------------- */
  /*                Step 3: User closes dialog and notifications                */
  /* -------------------------------------------------------------------------- */

  closeVerseDialog() {
    this._dialog.close()
  }

  closeToast() {
    this._toast.close()
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

  get isVerseDialogOpen() {
    return this._dialog.isOpen
  }

  get activeVerse() {
    return this._dialog.data
  }

  get toastMessage() {
    return this._toast.message
  }

  get isToastOpen() {
    return this._toast.isOpen
  }
}