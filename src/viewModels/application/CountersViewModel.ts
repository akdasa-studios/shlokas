import { Application } from "@akdasa-studios/shlokas-core";
import { ref } from "vue";

export class CountersViewModel {
  public inboxCardsCount = ref(0)

  private _app: Application

  constructor(app: Application) {
    this._app = app
  }

  public sync() {
    this.inboxCardsCount.value = this._app.inboxDeck.cards.length
  }
}