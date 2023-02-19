import { Emitter } from 'mitt'
import { InboxDeckTutorialController } from '@/app/decks/inbox'
import { ReviewDeckCardsController, ReviewDeckTutorialController } from '@/app/decks/review'
import { Events } from '@/app/Events'
import { StatisticsController } from '@/app/statistics'
import { AuthController } from '@/app/shared'
import { InitArgs, InitResult } from '../initialization'


export async function initControllers(
  { get, shlokas }: InitArgs
): Promise<InitResult> {
  const emitter = get<Emitter<Events>>('emitter')

  return {
    'inboxDeckTutorialController': new InboxDeckTutorialController(emitter),
    'reviewDeckCardsController':  new ReviewDeckCardsController(shlokas, emitter),
    'reviewDeckTutorialController': new ReviewDeckTutorialController(emitter),
    'statisticsController': new StatisticsController(shlokas, emitter),
    'authController': new AuthController(emitter),
  }
}