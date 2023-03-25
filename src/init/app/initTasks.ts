import { EventEmitter2 } from 'eventemitter2'
import { Application } from '@akdasa-studios/shlokas-core'

import { runRefreshTokenTask, runSyncTask } from '@/app/shared'
import { runUpdateStatisticsTask } from '@/app/statistics'
import { InitArgs } from '../initialization'


export async function initTasks(
  { get }: InitArgs
) {
  const shlokas = get<Application>('app')
  const emitter = get<EventEmitter2>('emitter')
  runRefreshTokenTask(emitter)
  runUpdateStatisticsTask(shlokas, emitter)
  runSyncTask(shlokas, emitter)
}