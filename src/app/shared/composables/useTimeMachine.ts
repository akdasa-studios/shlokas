import { Application } from '@akdasa-studios/shlokas-core'
import { ref } from 'vue'

const now = ref(new Date())
const daysInFuture = ref(0)

export function useTimeMachine(app: Application) {
  now.value = app.timeMachine.now

  function set(date: Date) {
    app.timeMachine.set(date)
    now.value = new Date(date)
  }

  function goInFuture(days=1) {
    daysInFuture.value = days
    set(app.timeMachine.add(new Date(), 24*days, 'h'))
  }

  return { now, goInFuture, daysInFuture }
}