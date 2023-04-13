import { useEnv } from '@/app/shared'
import { Logger } from '@akdasa-studios/framework'
import { EventEmitter2 } from 'eventemitter2'

import { useAccountStore } from '@/app/settings'
import { AuthService } from '@/services/AuthService'


export function runRefreshTokenTask(emitter: EventEmitter2) {
  const env     = useEnv()
  const service = new AuthService(env.getAuthUrl())
  const log     = new Logger('auth')

  emitter.on('backgroundTask', async () => {
    const now     = new Date().getTime()
    const account = useAccountStore()
    if (!account.token) { return }

    const expires = account.token?.expires ?? 0

    if (now >= expires) {
      log.debug('Refreshing token')
      const token = await service.refreshToken(account.token)
      if (!token) { log.error('Failed to refresh token') }
      account.token.expires = token.expires
      log.debug('Auth token refreshed', account.token)
    } else {
      log.debug('Token still valid')
    }
  })
}
