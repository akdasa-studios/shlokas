import { AnyCommand, AnyResult, ProcessorResult, Transaction } from '@akdasa-studios/framework'
import { Application } from "@akdasa-studios/shlokas-core"
import { ViewModel } from '@/app/DomainViewModel'
import { InboxDeckPageViewModel } from '@/app/decks/inbox/InboxDeckPageViewModel'
import { ReviewDeckPageViewModel } from '@/app/decks/review'
import { LibraryPageViewModel } from '@/app/library'
import { DebugController } from './DebugController'
import { SettingsPageViewModel } from './settings/SettingsPageViewModel'


export class ApplicationViewModel extends ViewModel {
  constructor(readonly app: Application) {
    super()
    this.settings.sync()
  }

  /* -------------------------------------------------------------------------- */
  /*                                 Properties                                 */
  /* -------------------------------------------------------------------------- */

  public readonly settings = new SettingsPageViewModel(this)
  public readonly library = new LibraryPageViewModel(this)
  public readonly inboxDeck = new InboxDeckPageViewModel(this)
  public readonly reviewDeck = new ReviewDeckPageViewModel(this)
  public readonly debug = new DebugController(this)

  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  async execute(command: AnyCommand, transaction?: Transaction): Promise<ProcessorResult<AnyResult>> {
    return await this.app.processor.execute(command, transaction)
  }

  /* -------------------------------------------------------------------------- */
  /*                                    Sync                                    */
  /* -------------------------------------------------------------------------- */

  sync() {
    this.library.sync()
    this.inboxDeck.sync()
    this.reviewDeck.sync()
  }
}
