import { UserGradesCardsUseCase } from '@/app/decks/review'
import { InitArgs, InitStageResult } from './initialization'


export async function initReviewDeck({ app }: InitArgs): Promise<InitStageResult> {
  const case1 = new UserGradesCardsUseCase(app)

  case1.open()

  return {
    inject: {
      "UserGradesCardsUseCase": case1,
    }
  }
}