import { CardMemorizationUseCase, InboxDeckTutorialUseCase } from '@/app/decks/inbox'
import { InitStageResult, InitArgs } from './initialization'


export async function initInboxDeck({ app }: InitArgs): Promise<InitStageResult> {
  const case1 = new CardMemorizationUseCase(app)
  const case2 = new InboxDeckTutorialUseCase(app)

  await case1.open()
  await case2.open()

  return {
    inject: {
      "CardMemorizationUseCase": case1,
      "InboxDeckTutorialUseCase": case2
    }
  }
}