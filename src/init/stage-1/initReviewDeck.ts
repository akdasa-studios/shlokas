import { UserGradesCardsUseCase , ReviewDeckTutorialUseCase } from '@/app/decks/review'
import { InitArgs, InitStageResult } from '../initialization'


export async function initReviewDeck(
  { shlokas }: InitArgs
): Promise<InitStageResult> {
  const case1 = new UserGradesCardsUseCase(shlokas)
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