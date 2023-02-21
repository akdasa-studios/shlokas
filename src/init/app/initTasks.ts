import { EventEmitter2 } from 'eventemitter2'
import { runSyncInboxDeckTask } from '@/app/decks/inbox'
import { runSyncReviewDeckTask } from '@/app/decks/review'

import { runRefreshTokenTask, runSyncTask } from '@/app/shared'
import { runUpdateStatisticsTask } from '@/app/statistics'
import { InitArgs } from '../initialization'


export async function initTasks(
  { get, shlokas }: InitArgs
) {
  const emitter = get<EventEmitter2>('emitter')
  runRefreshTokenTask(emitter)
  runUpdateStatisticsTask(shlokas, emitter)
  runSyncInboxDeckTask(shlokas, emitter)
  runSyncReviewDeckTask(shlokas, emitter)
  runSyncTask(shlokas, emitter)
}