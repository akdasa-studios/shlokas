import { Context, TimeMachine } from '@akdasa-studios/shlokas-core'
import { ref } from 'vue'
import { useSettingsStore } from '@/app/settings'
import { createRepositories } from '@/app/utils/sync'
import { useEnv } from './useEnv'
import { useAuthentication } from './useAuthentication'
import { useApplication } from './useApp'
import { useLogger } from './useLogger'
import { useEmitter } from './useEmitter'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

export interface SyncOptions {
  force: boolean
}


/* -------------------------------------------------------------------------- */
/*                                Shared State                                */
/* -------------------------------------------------------------------------- */

const inProgress = ref(false)


export function useSync() {
  /* -------------------------------------------------------------------------- */
  /*                                Dependencies                                */
  /* -------------------------------------------------------------------------- */

  const app         = useApplication()
  const settings    = useSettingsStore()
  const auth        = useAuthentication()
  const env         = useEnv()
  const log         = useLogger('sync')
  const emitter     = useEmitter()


  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  async function onExecute(options?: SyncOptions): Promise<boolean> {
    // Check if user is authenticated
    if (!settings.auth.token)        { return false }
    if (!settings.auth.sessionId)    { return false }
    if (!settings.auth.collectionId) { return false }

    inProgress.value = true
    try {
      // Refresh token if required
      log.startGroup('Syncing...')
      const now = new Date().getTime()
      const tokenExpiresAt = settings.auth.expiresAt || 0
      if (tokenExpiresAt < now) {
        log.debug('Token expired. Refreshing...')
        await auth.refresh()
      }

      // Sync database
      const databaseUrl = env.getDatabaseUrl(settings.auth.collectionId)
      const remoteRepos = createRepositories(databaseUrl, settings.auth.token)
      const context = new Context('sync', new TimeMachine(), remoteRepos)
      const currentTime  = new Date().getTime() // TODO: convert to UTC?
      const lastSyncTime = options?.force ? 0 : settings.sync.lastSyncTime

      log.debug(`Syncing to ${databaseUrl} since ${lastSyncTime}`)
      await app.instance().sync(context, {
        lastSyncTime: lastSyncTime,
        currentTime: currentTime
      })
      settings.sync.lastSyncTime = currentTime
      emitter.emit('syncCompleted')
    } catch (e) {
      log.error('Syncing failed...', e)
    } finally {
      inProgress.value = false
      log.debug('Syncing complete...')
      log.endGroup()
    }
    return true
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return {
    run: onExecute,
    inProgress
  }
}
