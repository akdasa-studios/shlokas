import { Context, TimeMachine } from '@akdasa-studios/shlokas-core'
import { ref } from 'vue'
import { useSettingsStore } from '@/app/settings'
import { createRepositories } from '@/app/utils/sync'
import { useEnv } from './useEnv'
import { useAuthentication } from './useAuthentication'
import { useApplication } from './useApp'
import { useLogger } from './useLogger'

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


  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  async function onExecute(options?: SyncOptions): Promise<boolean> {
    // Check if user is authenticated
    if (!settings.authToken)        { return false }
    if (!settings.authSessionId)    { return false }
    if (!settings.syncCollectionId) { return false }

    inProgress.value = true
    try {
      // Refresh token if required
      log.startGroup('Syncing...')
      const now = new Date().getTime()
      const timeToSyncInMins = (settings.authExpiresAt - now) / 1000 / 60

      if (timeToSyncInMins <= 5) {  // Refresh token if it expires in 5 mins
        log.debug('Token expired. Refreshing...')
        await auth.refresh()
      }

      // Sync database
      const databaseUrl = env.getDatabaseUrl(settings.syncCollectionId)
      const remoteRepos = createRepositories(databaseUrl, settings.authToken)
      const context = new Context('sync', new TimeMachine(), remoteRepos)
      const currentTime  = new Date().getTime() // TODO: convert to UTC?
      const lastSyncTime = options?.force ? 0 : settings.syncAt

      log.debug(`Syncing to ${databaseUrl} since ${lastSyncTime}`)
      await app.instance().sync(context, {
        lastSyncTime: lastSyncTime,
        currentTime: currentTime
      })
      settings.syncAt = currentTime
    } catch (e) {
      log.error('Syncing failed...', e)
      throw new Error('Syncing failed: ' + JSON.stringify(e))
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
