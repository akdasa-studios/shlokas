import { Logger } from '@akdasa-studios/framework'
import { EventEmitter2 } from 'eventemitter2'
import { useAuthentication} from '@/app/shared'
import { useSettingsStore } from '@/app/settings'


export function runRefreshTokenTask(emitter: EventEmitter2) {
  const auth = useAuthentication()
  const log = new Logger('auth')

  emitter.on('backgroundTask', async () => {
    const settings = useSettingsStore()
    if (!settings.auth.sessionId) { return }

    log.debug('Refreshing token...')
    try {
      await auth.refresh()
      log.debug('Token refreshed...')
    } catch (e) {
      log.debug('Token refresh failed...', e)
    }
  })
}
