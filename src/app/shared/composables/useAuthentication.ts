import { ref } from 'vue'
import { AuthenticationRequest, AuthenticationResponse, RefreshTokenResponse } from '@akdasa-studios/shlokas-protocol'
import { AuthenticationStrategy } from '@/services/auth/strategies'
import { useSettingsStore } from '@/app/settings'
import { useEnv } from './useEnv'

const strategies = new Map<string, AuthenticationStrategy>()


/**
 * Composable function to authenticate using specified strategy
 */
export function useAuthentication() {
  /* -------------------------------------------------------------------------- */
  /*                                Dependencies                                */
  /* -------------------------------------------------------------------------- */

  const env = useEnv()
  const settingsStore = useSettingsStore()

  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const inProgress = ref(false)


  /* -------------------------------------------------------------------------- */
  /*                                   Methods                                  */
  /* -------------------------------------------------------------------------- */

  function registerStrategy(
    strategyName: string,
    strategy: AuthenticationStrategy
  ) {
    strategies.set(strategyName, strategy)
  }

  function getStrategy(
    strategyName: string
  ): AuthenticationStrategy {
    if (!strategies.has(strategyName)) {
      throw new Error('Strategy not found: ' + strategyName)
    }
    return strategies.get(strategyName) as AuthenticationStrategy
  }

  /**
   * Authenticate using specified strategy
   * @param data Data to pass to strategy
   */
  async function authenticate(
    strategyName: string,
    data?: any
  ) {
    inProgress.value = true
    const strategy = getStrategy(strategyName)
    try {
      const authResult = await strategy.authenticate(data)

      // Create session using authorization code
      const authRequest: AuthenticationRequest = {
        authorizationCode: authResult.authorizationCode
      }
      const sessionResult = await _post('/', authRequest) as AuthenticationResponse

      // Store authentication result
      settingsStore.auth.collectionId = sessionResult.collectionId
      settingsStore.auth.token = sessionResult.idToken
      settingsStore.auth.sessionId = sessionResult.sessionId
      settingsStore.auth.strategy = strategyName
    } catch (error) {
      throw new Error('Error authorizing: ' + error)
    } finally {
      inProgress.value = false
    }
  }

  /**
   * Refresh token using current session
   */
  async function refresh() {
    inProgress.value = true
    try {
      const result = await _post('/refresh', {
        sessionId: settingsStore.auth.sessionId
      }) as RefreshTokenResponse
      settingsStore.auth.token = result.idToken
    } catch (error) {
      throw new Error('Error refreshing token: ' + error)
    } finally {
      inProgress.value = false
    }
  }


  /* -------------------------------------------------------------------------- */
  /*                                   Helpers                                  */
  /* -------------------------------------------------------------------------- */

  async function _post(
    url: string,
    data: any,
  ): Promise<any> {
    const fullUrl = env.getAuthUrl(settingsStore.auth.strategy) + url
    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    return response.json()
  }

  return { authenticate, inProgress, refresh, registerStrategy }
}