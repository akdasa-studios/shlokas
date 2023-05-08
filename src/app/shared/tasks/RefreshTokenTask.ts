import { Logger } from '@akdasa-studios/framework'
import { EventEmitter2 } from 'eventemitter2'
import { useEnv } from '@/app/shared'

import { AuthService } from '@/services/auth/AuthService'
import { useSettingsStore } from '@/app/settings'


export function runRefreshTokenTask(emitter: EventEmitter2) {
  const env     = useEnv()
  const service = new AuthService(env.getAuthUrl())
  const log     = new Logger('auth')

  emitter.on('backgroundTask', async () => {
    const settings = useSettingsStore()
    if (!settings.auth.token) { return }

    log.debug('Refreshing token...')
    try {
      // TODO: implement refresh token
      // const response = await service.refresh(settings.auth.session)
      // settings.auth.token = response.token
      log.debug('Token refreshed...')
    } catch (e) {
      log.debug('Token refresh failed...', e)
    }
  })
}
