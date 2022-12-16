import { Transaction } from '@akdasa-studios/framework'
import { InboxViewModel, LibraryViewModel } from "@/viewModels"
import { AnyCommand, AnyResult, ProcessorResult } from '@akdasa-studios/framework'
import { Application } from "@akdasa-studios/shlokas-core"


export class ApplicationViewModel {
  public readonly library = new LibraryViewModel()
  public readonly inbox = new InboxViewModel()

  constructor(public readonly app: Application) {
  }

  public execute(command: AnyCommand, transaction?: Transaction): ProcessorResult<AnyResult> {
    return this.app.processor.execute(command, transaction)
  }
}
