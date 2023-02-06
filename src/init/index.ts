// stage 0: infrastructure
import { initSentry } from "./stage-0/initSentry"
import { initDeviceStorage } from "./stage-0/initDeviceStorage"
import { initI18n } from "./stage-0/initI18n"
import { initPinia } from "./stage-0/initPinia"
import { initEmitter } from "./stage-0/initEmitter"
import { initAppStateChange } from "./stage-0/initAppStateChange"

// stage 1: logic
import { initCommands } from "./stage-1/initCommands"
import { initInboxDeck } from "./stage-1/initInboxDeck"
import { initLibrary } from "./stage-1/initLibrary"
import { initParams } from "./stage-1/initParams"
import { initReviewDeck } from "./stage-1/initReviewDeck"
import { initStores } from "./stage-1/initStores"
import { initStaticData } from "./stage-1/initStaticData"
import { initLocale } from "./stage-1/initLocale"
import { initSyncTask } from "./stage-1/initSyncTask"
import { initSchedule } from "./stage-1/initSchedule"


const initStages = [
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
  initLibrary,
  initInboxDeck,
  initReviewDeck,
  initSyncTask,
  initSchedule
]

export default initStages