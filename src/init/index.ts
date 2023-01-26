import { initInboxDeck } from "./initInboxDeck"
import { initReviewDeck } from "./initReviewDeck"
import { initLibrary } from "./initLibrary"
import { initGlobalCommandHandler } from "./initGlobalCommandHandler"


const initStages = [
  initGlobalCommandHandler,
  initLibrary,
  initInboxDeck,
  initReviewDeck
]


export default initStages