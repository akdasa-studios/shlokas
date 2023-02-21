import { Logger } from '@akdasa-studios/framework'
import { Capacitor } from '@capacitor/core'
import { BackgroundTask } from '@capawesome/capacitor-background-task'
import { EventEmitter2 } from 'eventemitter2'
import { InitArgs } from '../initialization'


export async function initBackgroundTask(
  { get }: InitArgs
) {
  const log = new Logger('sys')
  const emitter = get<EventEmitter2>('emitter')
  const supportedPlatforms = ['404']
  const currentPlatform = Capacitor.getPlatform()

  emitter.on('appStateChanged', async ({ isActive }) => {
    if (isActive) { return }
    if (supportedPlatforms.includes(currentPlatform)) {
      const taskId = await BackgroundTask.beforeExit(async () => {
        try {
          log.debug('Running background tasks')
          await emitter.emitAsync('backgroundTask')
        } catch (e) {
          log.error('Error while running background tasks', e)
        } finally {
          log.debug('Background tasks completed')
        }
      })
      BackgroundTask.finish({ taskId })
    } else {
      try {
        log.debug('Emulating background tasks')
        await emitter.emitAsync('backgroundTask')
      } catch (e) {
        log.error('Error while emulating background tasks', e)
      } finally {
        log.debug('Emulated background tasks completed')
      }
    }
  })
}