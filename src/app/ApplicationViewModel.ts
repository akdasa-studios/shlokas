import { AnyCommand, AnyResult, ProcessorResult, Transaction } from '@akdasa-studios/framework'
import { Application } from "@akdasa-studios/shlokas-core"
import { markRaw } from 'vue'
import { InboxPageViewModel } from '@/app/decks/inbox'
import { ReviewPageViewModel } from '@/app/decks/review'
import { LibraryPageViewModel } from '@/app/library'
import { DebugController } from './DebugController'
import { SettingsViewModel } from './settings/viewModels/SettingsViewModel'


export class ApplicationViewModel {
  public readonly library = markRaw(new LibraryPageViewModel())
  public readonly inbox = markRaw(new InboxPageViewModel())
  public readonly review = markRaw(new ReviewPageViewModel())
  public readonly settings = markRaw(new SettingsViewModel())
  public readonly debug = markRaw(new DebugController())

  constructor(readonly app: Application) {
  }

  public execute(command: AnyCommand, transaction?: Transaction): ProcessorResult<AnyResult> {
    return this.app.processor.execute(command, transaction)
  }
}
