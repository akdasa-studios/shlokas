import { initInboxDeck } from "./initInboxDeck"
import { initReviewDeck } from "./initReviewDeck"
import { initLibrary } from "./initLibrary"
import { initGlobalCommandHandler } from "./initGlobalCommandHandler"
import { initParams } from "./initParams"


const initStages = [
  initParams,
  initGlobalCommandHandler,
  initLibrary,
  initInboxDeck,
  initReviewDeck
]


export default initStages