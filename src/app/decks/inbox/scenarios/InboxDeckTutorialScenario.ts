import { Application } from "@akdasa-studios/shlokas-core"
import { useInboxDeckStore } from '@/app/decks/inbox'
import { TutorialCardViewModel } from '@/app/decks/shared'

export class InboxDeckTutorialScenario {
  private readonly _app: Application
  private readonly _inboxDeckStore

  constructor(app: Application) {
    this._app = app
    this._inboxDeckStore = useInboxDeckStore(this._app)
  }

  open() {
    this._inboxDeckStore.addCard(new TutorialCardViewModel("t01"))
    this._inboxDeckStore.addCard(new TutorialCardViewModel("t01"))
  }
}