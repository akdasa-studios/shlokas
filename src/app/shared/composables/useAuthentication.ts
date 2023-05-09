import { ref } from 'vue'
import { AuthService } from '@/services/auth/AuthService'
import { AuthenticationStrategy } from '@/services/auth/strategies'
import { useSettingsStore } from '@/app/settings'
import { useEnv } from './useEnv'


export function useAuthentication(strategy: AuthenticationStrategy) {
  const env = useEnv()
  const authService = new AuthService(env.getAuthUrl())
  const settingsStore = useSettingsStore()
  const inProgress = ref(false)

  async function authenticate(data?: any) {
    try {
      inProgress.value = true
      const result = await authService.authenticate(strategy, data)
      settingsStore.auth.database = result.database
      settingsStore.auth.token = result.token
      settingsStore.auth.session = result.sessionId
    } catch (error) {
      throw new Error('Error authorizing: ' + error)
    } finally {
      inProgress.value = false
    }
  }

  async function refresh() {
    try {
      inProgress.value = true
      const result = await authService.refresh(strategy, settingsStore.auth.session)
      settingsStore.auth.token = result.token
    } catch (error) {
      throw new Error('Error refreshing token: ' + error)
    } finally {
      inProgress.value = false
    }
  }

  return { authenticate, inProgress, refresh }
}