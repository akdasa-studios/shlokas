import { App } from '@capacitor/app'
import { Capacitor } from '@capacitor/core'
import { BackgroundTask } from '@capawesome/capacitor-background-task'
import { AUTH_HOST } from '@/app/Env'
import { useAccountStore } from '@/app/settings'
import { AuthService } from '@/services/AuthService'
import { InitArgs } from '../initialization'

export async function initSyncTask(
  { get }: InitArgs
) {
  if (Capacitor.getPlatform() !== 'ios') { return }

  // beforeExit works on iOS only
  App.addListener('appStateChange', async ({ isActive }) => {
    if (isActive) { return }
    const taskId = await BackgroundTask.beforeExit(async () => {
      const account = useAccountStore()
      if (account.token === undefined) { return }

      if (new Date().getTime() >= account.token.expires) {
        // refresh token
        const service = new AuthService(AUTH_HOST)
        account.token.expires = (await service.refreshToken(account.token)).expires
      } else if (account.syncHost) {
        // sync db
        await (get('couchDB') as any).sync(account.syncHost)
      }
      BackgroundTask.finish({ taskId })
    })
  })
}
