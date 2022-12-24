import { AnyCommand, AnyResult, ProcessorResult, Transaction } from '@akdasa-studios/framework'
import { Application } from "@akdasa-studios/shlokas-core"
import { InboxDeckPageViewModel } from '@/app/decks/inbox/InboxDeckPageViewModel'
import { ReviewDeckPageViewModel } from '@/app/decks/review'
import { LibraryPageViewModel } from '@/app/library'
import { DebugController } from './DebugController'
import { SettingsPageViewModel } from './settings/SettingsPageViewModel'


export class ApplicationViewModel {
  public readonly library = new LibraryPageViewModel()
  public readonly inboxDeck = new InboxDeckPageViewModel()
  public readonly reviewDeck = new ReviewDeckPageViewModel()
  public readonly settings = new SettingsPageViewModel()
  public readonly debug = new DebugController()

  constructor(readonly app: Application) {
  }

  public execute(command: AnyCommand, transaction?: Transaction): ProcessorResult<AnyResult> {
    return this.app.processor.execute(command, transaction)
  }
}
