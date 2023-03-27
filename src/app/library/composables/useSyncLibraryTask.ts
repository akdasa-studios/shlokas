import { ref } from 'vue'
import { Logger } from '@akdasa-studios/framework'
import { getDatabaseUrl } from '@/app/Env'

export interface SyncOptions {
  showProgress: boolean
}


export function useSyncLibraryTask(
  libraryDatabase: any
) {
  const logger = new Logger('init')
  const inProgress = ref(false)

  async function sync(options?: SyncOptions) {
    try {
      const sp = options?.showProgress ?? undefined
      inProgress.value = sp === false ? false : true

      logger.debug('Syncing library...')
      await libraryDatabase.replicateFrom(getDatabaseUrl('shlokas'))
      logger.debug('Library synced')
    } catch (err) {
      logger.error('Failed to sync static data', err)
    }
    inProgress.value = false
  }

  return { sync, inProgress }
}
