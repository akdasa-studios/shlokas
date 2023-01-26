import { UserGradesCardsUseCase } from '@/app/decks/review'
import { InitArgs, InitStageResult } from './initialization'


export function initReviewDeck({ app }: InitArgs): InitStageResult {
  const case1 = new UserGradesCardsUseCase(app)

  case1.open()

  return {
    inject: {
      "UserGradesCardsUseCase": case1,
    }
  }
}