import { Application } from "@akdasa-studios/shlokas-core"
import { CountersViewModel } from "./CountersViewModel"

export class ApplicationViewModel {
  private _app: Application
  private _counters: CountersViewModel

  constructor(app: Application) {
    this._app = app
    this._counters = new CountersViewModel(app)
  }

  public get app() : Application {
    return this._app
  }

  public get counters() {
    return this._counters
  }
}
