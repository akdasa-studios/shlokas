// stage 0: infrastructure
import { initSentry } from './infrastructure/initSentry'
import { initLogging } from './infrastructure/initLogging'
import { initDeviceStorage } from './infrastructure/initDeviceStorage'
import { initI18n } from './infrastructure/initI18n'
import { initPinia } from './infrastructure/initPinia'
import { initEmitter } from './infrastructure/initEmitter'
import { initAppStateChange } from './infrastructure/initAppStateChange'
import { initBackgroundTask } from './app/initBackgroundTask'

// stage 1: logic
import { initCommands } from './app/initCommands'
import { initTasks } from './app/initTasks'
import { initParams } from './app/initParams'
import { initStores } from './app/initStores'
import { initStaticData } from './app/initStaticData'
import { initLocale } from './app/initLocale'


const initStages = [
  initLogging,
  initSentry,
  initDeviceStorage,
  initPinia,
  initI18n,
  initEmitter,
  initAppStateChange,
  initBackgroundTask,

  initLocale,
  initStores,
  initParams,
  initCommands,
  initStaticData,
  initTasks,
]

export default initStages