import { EventEmitter2 } from 'eventemitter2'

import { runSyncTask } from '@/app/shared'
import { runUpdateStatisticsTask } from '@/app/statistics'
import { runTutorialPersistenceTask, runTutorialRestoreTask } from '@/app/tutorial'
import { InitArgs } from '../initialization'


export async function initTasks(
  { get }: InitArgs
) {
  const emitter = get<EventEmitter2>('emitter')
  runUpdateStatisticsTask(emitter)
  runSyncTask(emitter)
  await runTutorialPersistenceTask()
  await runTutorialRestoreTask()
}