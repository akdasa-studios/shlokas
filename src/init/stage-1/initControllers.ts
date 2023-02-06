import { Emitter } from 'mitt'
import { InboxDeckCardsController, InboxDeckTutorialController } from '@/app/decks/inbox'
import { ReviewDeckCardsController, ReviewDeckTutorialController } from '@/app/decks/review'
import { Events } from '@/app/Events'
import { LibraryAddVerseController, LibraryVersesController } from '@/app/library'
import { StatisticsController } from '@/app/statistics'
import { InitArgs, InitStageResult } from '../initialization'


export async function initControllers(
  { get, shlokas }: InitArgs
): Promise<InitStageResult> {
  const emitter = get<Emitter<Events>>("emitter")

  return {
    inject: {
      "AddVerseToInboxDeckUseCase": new LibraryAddVerseController(shlokas),
      "SearchVersesUseCase": new LibraryVersesController(shlokas, emitter),
      "CardMemorizationUseCase": new InboxDeckCardsController(shlokas, emitter),
      "InboxDeckTutorialUseCase": new InboxDeckTutorialController(emitter),
      "UserGradesCardsUseCase":  new ReviewDeckCardsController(shlokas, emitter),
      "ReviewDeckTutorialUseCase": new ReviewDeckTutorialController(emitter),
      "statisticsController": new StatisticsController(shlokas, emitter)
    }
  }
}