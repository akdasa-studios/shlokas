import { Logger } from '@akdasa-studios/framework'
import { Application } from '@akdasa-studios/shlokas-core'
import { Capacitor } from '@capacitor/core'
import { BackgroundTask } from '@capawesome/capacitor-background-task'
import { Emitter } from 'mitt'
import { createRepositories } from '@/app/utils/sync'
import { useAccountStore } from '@/app/settings'
import { Events } from '@/app/Events'


export function runSyncTask(app: Application, emitter: Emitter<Events>) {
  const log = new Logger('sync')
  const supportedPlatforms = ['ios', 'android']
  const currentPlatform = Capacitor.getPlatform()

  emitter.on('appStateChanged', async ({ isActive }) => {
    if (isActive) { return }
    if (supportedPlatforms.includes(currentPlatform)) {
      const taskId = await BackgroundTask.beforeExit(async () => {
        await sync()
      })
      BackgroundTask.finish({ taskId })
    } else {
      await sync()
    }
  })

  async function sync() {
    const account = useAccountStore()
    if (account.syncHost) {
      log.debug('Syncing in background')
      const remoteRepos = createRepositories(account.syncHost as string)
      await app.sync(remoteRepos)
      emitter.emit('syncCompleted')
    }
  }
}
