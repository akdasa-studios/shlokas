import { CardMemorizationUseCase, InboxDeckTutorialUseCase } from '@/app/decks/inbox'
import { InitStageResult, InitArgs } from '../initialization'


export async function initInboxDeck(
  { shlokas }: InitArgs
): Promise<InitStageResult> {
  const case1 = new CardMemorizationUseCase(shlokas)
  const case2 = new InboxDeckTutorialUseCase()

  await case1.addCardsToDeck()
  await case2.addTutorialCards()

  return {
    inject: {
      "CardMemorizationUseCase": case1,
      "InboxDeckTutorialUseCase": case2
    }
  }
}