import { Emitter } from 'mitt'
import { ReviewDeckTutorialUseCase, UserGradesCardsUseCase } from '@/app/decks/review'
import { Events } from '@/app/Events'
import { StatisticsController } from '@/app/statistics'
import { InitArgs, InitStageResult } from '../initialization'


export async function initReviewDeck(
  { get, shlokas }: InitArgs
): Promise<InitStageResult> {
  const emitter = get<Emitter<Events>>("emitter")
  const case1 = new UserGradesCardsUseCase(shlokas, emitter)
  const case2 = new ReviewDeckTutorialUseCase()
  const statisticsController = new StatisticsController(shlokas, emitter)

  await case1.addCardsToDeck()
  await case2.addTutorialCards()

  return {
    inject: {
      "UserGradesCardsUseCase": case1,
      "ReviewDeckTutorialUseCase": case2,
      statisticsController
    }
  }
}