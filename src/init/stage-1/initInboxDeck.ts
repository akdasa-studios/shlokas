import { Emitter } from 'mitt'
import { CardMemorizationUseCase, InboxDeckTutorialUseCase } from '@/app/decks/inbox'
import { Events } from '@/app/Events'
import { InitArgs, InitStageResult } from '../initialization'


export async function initInboxDeck(
  { get, shlokas }: InitArgs
): Promise<InitStageResult> {
  const emitter = get<Emitter<Events>>("emitter")
  const case1 = new CardMemorizationUseCase(shlokas, emitter)
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