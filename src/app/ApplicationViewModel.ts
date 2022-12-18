import { InboxViewModel } from '@/app/decks/inbox/viewModels'
import { LibraryViewModel } from '@/app/library/viewModels'
import { AnyCommand, AnyResult, ProcessorResult, Transaction } from '@akdasa-studios/framework'
import { Application } from "@akdasa-studios/shlokas-core"
import { markRaw } from 'vue'


export class ApplicationViewModel {
  public readonly library = markRaw(new LibraryViewModel())
  public readonly inbox = markRaw(new InboxViewModel())

  constructor(public readonly app: Application) {
  }

  public execute(command: AnyCommand, transaction?: Transaction): ProcessorResult<AnyResult> {
    return this.app.processor.execute(command, transaction)
  }
}
