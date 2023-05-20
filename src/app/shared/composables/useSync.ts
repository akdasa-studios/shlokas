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
/*                                Shared State                                */
/* -------------------------------------------------------------------------- */

const inProgress = ref(false)


export function useSync() {
  /* -------------------------------------------------------------------------- */
  /*                                Dependencies                                */
  /* -------------------------------------------------------------------------- */

  const app      = useApplication()
  const settings = useSettingsStore()
  const auth     = useAuthentication()
  const env      = useEnv()
  const log      = useLogger('sync')
  const emitter  = useEmitter()


  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  async function onExecute(): Promise<boolean> {
    // Check if user is authenticated
    if (!settings.auth.token)        { return false }
    if (!settings.auth.sessionId)    { return false }
    if (!settings.auth.collectionId) { return false }

    inProgress.value = true
    try {
      // Refresh token if required
      const now = new Date().getTime()
      const tokenExpiresAt = settings.auth.expiresAt || 0
      if (tokenExpiresAt < now) {
        log.debug('Token expired. Refreshing...')
        await auth.refresh()
      }

      // Sync database
      const databaseUrl = env.getDatabaseUrl(settings.auth.collectionId)
      const remoteRepos = createRepositories(databaseUrl, settings.auth.token)
      log.debug(`Syncing to ${databaseUrl}...`)
      await app.instance().sync(new Context('sync', new TimeMachine(), remoteRepos))
      emitter.emit('syncCompleted')
    } catch (e) {
      log.error('Syncing failed...', e)
    } finally {
      inProgress.value = false
      log.debug('Syncing complete...')
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
