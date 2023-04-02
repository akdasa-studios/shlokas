import { Application, Context } from '@akdasa-studios/shlokas-core'
import { computed, ref } from 'vue'

const contexts = new Map<string, Context>()
let application: Application
const currentContextName = ref<string>('')

const now = ref(new Date())


export function useApplication() {
  function init(app: Application) {
    application = app
    application.contextChanged.subscribe(onContextChanged)
    currentContextName.value = app.context.name
    now.value = new Date(application.context.timeMachine.now)
  }

  function instance() {
    return application
  }

  function registerContext(context: Context) {
    contexts.set(context.name, context)
  }

  function switchContextTo(name: string) {
    const context = contexts.get(name)
    if (context) {
      application.changeContext(context)
    }
  }

  function onContextChanged(context: Context) {
    currentContextName.value = context.name
    now.value = new Date(application.context.timeMachine.now)
  }

  function setTime(date: Date) {
    application.context.timeMachine.set(date)
    now.value = new Date(date)
  }

  function goInFuture(days=1) {
    setTime(application.timeMachine.add(new Date(), 24*days, 'h'))
  }

  const daysInFuture = computed(() => {
    const date1 = now.value
    const date2 = new Date()
    const diffTime = Math.abs(date2.getTime() - date1.getTime())
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  })


  return { init, switchContextTo, registerContext, currentContextName, goInFuture, daysInFuture, application, now, instance, setTime }
}