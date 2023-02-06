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
      "libraryAddVerseController": new LibraryAddVerseController(shlokas),
      "libraryVersesController": new LibraryVersesController(shlokas, emitter),
      "inboxDeckCardsController": new InboxDeckCardsController(shlokas, emitter),
      "inboxDeckTutorialController": new InboxDeckTutorialController(emitter),
      "reviewDeckCardsController":  new ReviewDeckCardsController(shlokas, emitter),
      "reviewDeckTutorialController": new ReviewDeckTutorialController(emitter),
      "statisticsController": new StatisticsController(shlokas, emitter)
    }
  }
}