import { Logger } from '@akdasa-studios/framework'
import { Application, Context, TimeMachine } from '@akdasa-studios/shlokas-core'
import { EventEmitter2 } from 'eventemitter2'

import { useAccountStore } from '@/app/settings'
import { createRepositories } from '@/app/utils/sync'


export function runSyncTask(app: Application, emitter: EventEmitter2) {
  const log = new Logger('sync')

  emitter.on('backgroundTask', async () => {
    const account = useAccountStore()
    if (account.syncHost) {
      log.debug('Syncing in background')
      const remoteRepos = createRepositories(account.syncHost as string)
      await app.sync(new Context('sync', new TimeMachine(), remoteRepos))
      emitter.emit('syncCompleted')
    }
  })
}
