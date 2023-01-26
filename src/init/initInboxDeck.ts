import { CardMemorizationUseCase, InboxDeckTutorialUseCase } from '@/app/decks/inbox'
import { InitStageResult, InitArgs } from './initialization'


export function initInboxDeck({ app }: InitArgs): InitStageResult {
  const case1 = new CardMemorizationUseCase(app)
  const case2 = new InboxDeckTutorialUseCase(app)

  case1.open()
  // case2.open()

  return {
    inject: {
      "CardMemorizationUseCase": case1,
      "InboxDeckTutorialUseCase": case2
    }
  }
}