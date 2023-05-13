import { Logger } from '@akdasa-studios/framework'
import { Application, Context, TimeMachine } from '@akdasa-studios/shlokas-core'
import { EventEmitter2 } from 'eventemitter2'
import { ref } from 'vue'
import { useSettingsStore } from '@/app/settings'
import { createRepositories } from '@/app/utils/sync'
import { useEnv } from '../composables/useEnv'


const taskState = {
  inProgress: ref(false),
  run: () => {}
}


export function runSyncTask(app: Application, emitter: EventEmitter2) {

  /* -------------------------------------------------------------------------- */
  /*                                Dependencies                                */
  /* -------------------------------------------------------------------------- */

  const log = new Logger('sync')


  /* -------------------------------------------------------------------------- */
  /*                                  Triggers                                  */
  /* -------------------------------------------------------------------------- */

  emitter.on('appStateChanged', async () => await onExecute())


  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  async function onExecute(): Promise<boolean> {
    const settings = useSettingsStore()
    const env = useEnv()

    if (!settings.auth.token)    { return false }
    if (!settings.auth.collectionId) { return false }

    taskState.inProgress.value = true
    try {
      log.debug('Syncing...')
      const databaseUrl = env.getDatabaseUrl(settings.auth.collectionId)
      const remoteRepos = createRepositories(databaseUrl, settings.auth.token)
      await app.sync(new Context('sync', new TimeMachine(), remoteRepos))
      emitter.emit('syncCompleted')
    } catch (e) {
      log.error('Syncing failed...', e)
    } finally {
      taskState.inProgress.value = false
      log.debug('Syncing complete...')
    }
    return true
  }

  taskState.run = onExecute
}


export function useSyncTask() {
  return {
    inProgress: taskState.inProgress,
    run: taskState.run
  }
}