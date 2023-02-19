import { Emitter } from 'mitt'
import { ReviewDeckCardsController, ReviewDeckTutorialController } from '@/app/decks/review'
import { Events } from '@/app/Events'
import { AuthController } from '@/app/shared'
import { StatisticsController } from '@/app/statistics'
import { InitArgs, InitResult } from '../initialization'


export async function initControllers(
  { get, shlokas }: InitArgs
): Promise<InitResult> {
  const emitter = get<Emitter<Events>>('emitter')

  return {
    'reviewDeckCardsController':  new ReviewDeckCardsController(shlokas, emitter),
    'reviewDeckTutorialController': new ReviewDeckTutorialController(emitter),
    'statisticsController': new StatisticsController(shlokas, emitter),
    'authController': new AuthController(emitter),
  }
}