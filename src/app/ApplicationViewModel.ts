import { AnyCommand, AnyResult, ProcessorResult, Transaction } from '@akdasa-studios/framework'
import { Application } from "@akdasa-studios/shlokas-core"
import { InboxDeckPageViewModel } from '@/app/decks/inbox/InboxDeckPageViewModel'
import { ReviewDeckPageViewModel } from '@/app/decks/review'
import { LibraryPageViewModel } from '@/app/library'
import { DebugController } from './DebugController'
import { SettingsPageViewModel } from './settings/SettingsPageViewModel'


export class ApplicationViewModel {
  constructor(readonly app: Application) {}

  /* -------------------------------------------------------------------------- */
  /*                                 Properties                                 */
  /* -------------------------------------------------------------------------- */

  public readonly library = new LibraryPageViewModel(this)
  public readonly inboxDeck = new InboxDeckPageViewModel(this)
  public readonly reviewDeck = new ReviewDeckPageViewModel(this)
  public readonly settings = new SettingsPageViewModel(this)
  public readonly debug = new DebugController(this)

  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  public execute(command: AnyCommand, transaction?: Transaction): ProcessorResult<AnyResult> {
    return this.app.processor.execute(command, transaction)
  }
}
