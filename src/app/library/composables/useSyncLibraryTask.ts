import { ref } from 'vue'
import { Logger } from '@akdasa-studios/framework'
import { useEnv } from '@/app/shared'

export interface SyncOptions {
  showProgress: boolean
}

const inProgress = ref(false)
const isFailed = ref(false)

export function useSyncLibraryTask(
  libraryDatabase: any
) {
  const env = useEnv()
  const logger = new Logger('sync')

  async function sync(options?: SyncOptions) {
    try {
      const sp = options?.showProgress ?? undefined
      inProgress.value = sp === false ? false : true

      logger.debug('Syncing library...')
      await libraryDatabase.replicateFrom(env.getDatabaseUrl('shlokas'))
      logger.debug('Library synced')
      isFailed.value = false
    } catch (err) {
      logger.error('Failed to sync static data', err)
      isFailed.value = true
    } finally {
      inProgress.value = false
    }
  }

  return { sync, inProgress, isFailed }
}
