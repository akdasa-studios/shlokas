import { AnyCommand, AnyResult, ProcessorResult, Transaction } from '@akdasa-studios/framework'
import { Application } from "@akdasa-studios/shlokas-core"
import { markRaw } from 'vue'
import { InboxViewModel } from '@/app/decks/inbox/viewModels'
import { ReviewViewModel } from '@/app/decks/review/viewModels'
import { LibraryViewModel } from '@/app/library/viewModels'
import { DebugController } from './DebugController'
import { SettingsViewModel } from './settings/viewModels/SettingsViewModel'


export class ApplicationViewModel {
  public readonly library = markRaw(new LibraryViewModel())
  public readonly inbox = markRaw(new InboxViewModel())
  public readonly review = markRaw(new ReviewViewModel())
  public readonly settings = markRaw(new SettingsViewModel())
  public readonly debug = markRaw(new DebugController())

  constructor(readonly app: Application) {
  }

  public execute(command: AnyCommand, transaction?: Transaction): ProcessorResult<AnyResult> {
    return this.app.processor.execute(command, transaction)
  }
}
