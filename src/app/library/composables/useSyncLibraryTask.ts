import { ref } from 'vue'
import { Logger } from '@akdasa-studios/framework'
import { useEnv } from '@/app/shared'
import { useSettingsStore } from '@/app/settings'

export interface SyncOptions {
  force?: boolean
}

const inProgress = ref(false)

export function useSyncLibraryTask(
  libraryDatabase: any
) {
  const WEEK = 604800000 // 1000 * 60 * 60 * 24 * 7


  /* -------------------------------------------------------------------------- */
  /*                                Dependencies                                */
  /* -------------------------------------------------------------------------- */

  const env = useEnv()
  const logger = new Logger('sync')
  const settings = useSettingsStore()


  /* -------------------------------------------------------------------------- */
  /*                                   Methods                                  */
  /* -------------------------------------------------------------------------- */

  async function sync(options?: SyncOptions) {
    const now = new Date().getTime()
    const syncedMoreThanAWeekAgo = (now - settings.syncLibraryAt) > WEEK
    const notSyncedAtAll         = settings.syncLibraryAt === 0
    const syncRequired           = syncedMoreThanAWeekAgo || notSyncedAtAll || options?.force

    if (!syncRequired) {
      logger.debug('Library sync is not required')
      return
    }

    try {
      inProgress.value = true
      logger.debug('Syncing library...')
      await libraryDatabase.replicateFrom(env.getDatabaseUrl('shlokas'))
      logger.debug('Library synced')
      settings.syncLibraryAt = new Date().getTime()
    } catch (err) {
      logger.error('Failed to sync static data', err)
    } finally {
      inProgress.value = false
    }
  }

  return { sync, inProgress }
}
