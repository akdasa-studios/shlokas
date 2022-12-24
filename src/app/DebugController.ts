import { root } from "@/application"

export class DebugController{
  nextDay() {
    root.app.timeMachine.set(
      root.app.timeMachine.add(
        root.app.timeMachine.now,
        24, "h"
      )
    )

    root.reviewDeck.sync()
  }
}