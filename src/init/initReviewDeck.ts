import { UserGradesCardsUseCase } from '@/app/decks/review'
import { ReviewDeckTutorialUseCase } from '@/app/decks/review/useCases/ReviewDeckTutorialUseCase'
import { InitArgs, InitStageResult } from './initialization'


export async function initReviewDeck({ app }: InitArgs): Promise<InitStageResult> {
  const case1 = new UserGradesCardsUseCase(app)
  const case2 = new ReviewDeckTutorialUseCase()

  await case1.open()
  await case2.addTutorialCards()

  return {
    inject: {
      "UserGradesCardsUseCase": case1,
      "ReviewDeckTutorialUseCase": case2
    }
  }
}