// stage 0: infrastructure
import { initSentry } from './infrastructure/initSentry'
import { initLogging } from './infrastructure/initLogging'
import { initDeviceStorage } from './infrastructure/initDeviceStorage'
import { initDatabases } from './infrastructure/initDatabases'
import { initI18n } from './infrastructure/initI18n'
import { initPinia } from './infrastructure/initPinia'
import { initEmitter } from './infrastructure/initEmitter'
import { initAppStateChange } from './infrastructure/initAppStateChange'
import { initBackgroundTask } from './app/initBackgroundTask'
import { initShlokasApp } from './infrastructure/initShlokasApp'

// stage 1: logic
import { initCommands } from './app/initCommands'
import { initTasks } from './app/initTasks'
import { initParams } from './app/initParams'
import { initStores } from './app/initStores'
import { initStaticData } from './app/initStaticData'
import { initLocale } from './app/initLocale'
import { initMigrations } from './app/initMigrations'
import { initSyncStaticData } from './app/initSyncStaticData'

export const appInitStages = [
  initLogging,
  initSentry,
  initDeviceStorage,
  initDatabases,
  initPinia,
  initI18n,
  initEmitter,
  initAppStateChange,
  initBackgroundTask,
  initShlokasApp,

  initLocale,
  initStores,
  initParams,
  initCommands,
  initTasks,
  initMigrations,
  initSyncStaticData,
  initStaticData,
]

