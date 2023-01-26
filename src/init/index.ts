import { initInboxDeck } from "./initInboxDeck"
import { initLibrary } from "./initLibrary"
import { initGlobalCommandHandler } from "./initGlobalCommandHandler"


const initStages = [
  initGlobalCommandHandler,
  initLibrary,
  initInboxDeck
]


export default initStages