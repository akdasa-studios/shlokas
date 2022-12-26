import { ApplicationViewModel } from "./ApplicationViewModel"

export class DebugController{
  constructor(private readonly shlokas: ApplicationViewModel) {
  }

  nextDay() {
    this.shlokas.app.timeMachine.set(
      this.shlokas.app.timeMachine.add(
        this.shlokas.app.timeMachine.now,
        24, "h"
      )
    )

    this.shlokas.reviewDeck.sync()
  }
}