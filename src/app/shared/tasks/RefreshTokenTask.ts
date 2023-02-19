import { Logger } from '@akdasa-studios/framework'
import { BackgroundTask } from '@capawesome/capacitor-background-task'
import { Emitter } from 'mitt'
import { Capacitor } from '@capacitor/core'
import { AUTH_HOST } from '@/app/Env'
import { Events } from '@/app/Events'
import { useAccountStore } from '@/app/settings'
import { AuthService } from '@/services/AuthService'


export function runRefreshTokenTask(emitter: Emitter<Events>) {
  const service = new AuthService(AUTH_HOST)
  const log = new Logger('auth')

    emitter.on('appStateChanged', async ({ isActive }) => {
      if (isActive) { return }
      if (Capacitor.getPlatform() !== 'ios') { return }

      const taskId = await BackgroundTask.beforeExit(async () => {
        await refreshToken()
      })
      BackgroundTask.finish({ taskId })
    })

  async function refreshToken() {
    const now     = new Date().getTime()
    const account = useAccountStore()
    if (!account.token) { return }

    const expires = account.token?.expires ?? 0

    if (now >= expires) {
      const token = await service.refreshToken(account.token)
      if (!token) { log.error('Failed to refresh token') }
      account.token.expires = token.expires
      log.debug('auth token refreshed', account.token)
    } else {
      log.debug('token still valid')
    }
  }
}
