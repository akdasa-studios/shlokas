import { shlokas } from "@/application"

export class DebugController{
  nextDay() {
    shlokas.app.timeMachine.set(
      shlokas.app.timeMachine.add(
        shlokas.app.timeMachine.now,
        24, "h"
      )
    )

    shlokas.reviewDeck.sync()
  }
}