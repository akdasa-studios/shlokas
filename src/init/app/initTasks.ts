import { Emitter } from 'mitt'
import { runSyncInboxDeckTask } from '@/app/decks/inbox'
import { runSyncReviewDeckTask } from '@/app/decks/review'
import { Events } from '@/app/Events'
import { runRefreshTokenTask } from '@/app/shared'
import { runUpdateStatisticsTask } from '@/app/statistics'
import { InitArgs } from '../initialization'


export async function initTasks(
  { get, shlokas }: InitArgs
) {
  const emitter = get<Emitter<Events>>('emitter')
  runRefreshTokenTask(emitter)
  runUpdateStatisticsTask(shlokas, emitter)
  runSyncInboxDeckTask(shlokas, emitter)
  runSyncReviewDeckTask(shlokas, emitter)
}