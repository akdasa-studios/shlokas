// stage 0: infrastructure
import { initSentry } from './stage-0/initSentry'
import { initLogging } from './stage-0/initLogging'
import { initDeviceStorage } from './stage-0/initDeviceStorage'
import { initI18n } from './stage-0/initI18n'
import { initPinia } from './stage-0/initPinia'
import { initEmitter } from './stage-0/initEmitter'
import { initAppStateChange } from './stage-0/initAppStateChange'

// stage 1: logic
import { initCommands } from './stage-1/initCommands'
import { initControllers } from './stage-1/initControllers'
import { initParams } from './stage-1/initParams'
import { initStores } from './stage-1/initStores'
import { initStaticData } from './stage-1/initStaticData'
import { initLocale } from './stage-1/initLocale'
import { initSyncTask } from './stage-1/initSyncTask'


const initStages = [
  initLogging,
  initSentry,
  initDeviceStorage,
  initPinia,
  initI18n,
  initEmitter,
  initAppStateChange,

  initLocale,
  initStores,
  initParams,
  initCommands,
  initStaticData,
  initControllers,
  initSyncTask,
]

export default initStages