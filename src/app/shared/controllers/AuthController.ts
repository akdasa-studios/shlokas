import { Logger } from '@akdasa-studios/framework'
import { BackgroundTask } from '@capawesome/capacitor-background-task'
import { Emitter } from 'mitt'
import { Capacitor } from '@capacitor/core'
import { AUTH_HOST } from '@/app/Env'
import { Events } from '@/app/Events'
import { useAccountStore } from '@/app/settings'
import { AuthService } from '@/services/AuthService'


export class AuthController {
  private service = new AuthService(AUTH_HOST)
  private log = new Logger('auth')

  constructor(emitter: Emitter<Events>) {
    emitter.on('appStateChanged', async ({ isActive }) => {
      if (isActive) { return }
      if (Capacitor.getPlatform() !== 'ios') { return }

      const taskId = await BackgroundTask.beforeExit(async () => {
        await this.refreshToken()
      })
      BackgroundTask.finish({ taskId })
    })
  }

  async refreshToken() {
    const now     = new Date().getTime()
    const account = useAccountStore()
    if (!account.token) { return }

    const expires = account.token?.expires ?? 0

    if (now >= expires) {
      const token = await this.service.refreshToken(account.token)
      if (!token) { this.log.error('Failed to refresh token') }
      account.token.expires = token.expires
      this.log.debug('auth token refreshed', account.token)
    } else {
      this.log.debug('token still valid')
    }
  }
}
