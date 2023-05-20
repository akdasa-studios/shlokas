// stage 0: infrastructure
import { initLogging } from './infrastructure/initLogging'
import { initSentry } from './infrastructure/initSentry'
import { initLiveUpdate } from './infrastructure/initLiveUpdate'
import { initDeviceStorage } from './infrastructure/initDeviceStorage'
import { initDatabases } from './infrastructure/initDatabases'
import { initI18n } from './infrastructure/initI18n'
import { initPinia } from './infrastructure/initPinia'
import { initAppStateChange } from './infrastructure/initAppStateChange'
import { initShlokasApp } from './infrastructure/initShlokasApp'
import { initAuth } from './infrastructure/initAuth'

// stage 1: logic
import { initCommands } from './app/initCommands'
import { initTasks } from './app/initTasks'
import { initParams } from './app/initParams'
import { initStores } from './app/initStores'
import { initStaticData } from './app/initStaticData'
import { initLocale } from './app/initLocale'
import { initMigrations } from './app/initMigrations'
import { initRoutes } from './app/initRoutes'

export const appInitStages = [
  initLogging,
  initSentry,
  initLiveUpdate,
  initDeviceStorage,
  initDatabases,
  initPinia,
  initI18n,
  initAppStateChange,
  initAuth,
  initShlokasApp,

  initStores,
  initLocale,
  initParams,
  initCommands,
  initTasks,
  initMigrations,
  initStaticData,
  initRoutes
]

