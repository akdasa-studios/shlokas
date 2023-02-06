import { Emitter } from 'mitt'
import { UserGradesCardsUseCase , ReviewDeckTutorialUseCase } from '@/app/decks/review'
import { Events } from '@/app/Events'
import { InitArgs, InitStageResult } from '../initialization'


export async function initReviewDeck(
  { get, shlokas }: InitArgs
): Promise<InitStageResult> {
  const emitter = get<Emitter<Events>>("emitter")
  const case1 = new UserGradesCardsUseCase(shlokas, emitter)
  const case2 = new ReviewDeckTutorialUseCase()

  await case1.addCardsToDeck()
  await case2.addTutorialCards()

  return {
    inject: {
      "UserGradesCardsUseCase": case1,
      "ReviewDeckTutorialUseCase": case2
    }
  }
}