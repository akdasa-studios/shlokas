import { Emitter } from 'mitt'
import { ReviewDeckCardsController, ReviewDeckTutorialController } from '@/app/decks/review'
import { Events } from '@/app/Events'
import { runRefreshTokenTask } from '@/app/shared'
import { runUpdateStatisticsTask } from '@/app/statistics'
import { runSyncInboxDeckTask } from '@/app/decks/inbox'
import { InitArgs, InitResult } from '../initialization'


export async function initControllers(
  { get, shlokas }: InitArgs
): Promise<InitResult> {
  const emitter = get<Emitter<Events>>('emitter')

  runRefreshTokenTask(emitter)
  runUpdateStatisticsTask(shlokas, emitter)
  runSyncInboxDeckTask(shlokas, emitter)

  return {
    'reviewDeckCardsController':  new ReviewDeckCardsController(shlokas, emitter),
    'reviewDeckTutorialController': new ReviewDeckTutorialController(emitter),
  }
}