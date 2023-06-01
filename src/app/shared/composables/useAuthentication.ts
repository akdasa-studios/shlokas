import { ref } from 'vue'
import { AuthenticationRequest, AuthenticationResponse, RefreshTokenResponse } from '@akdasa-studios/shlokas-protocol'
import jwt_decode from 'jwt-decode'
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
      const sessionResult = await _post(strategyName, '/', authRequest) as AuthenticationResponse
      if (sessionResult.status === 'ok') {
        // Store authentication result
        settingsStore.syncCollectionId = sessionResult.collectionId
        settingsStore.authToken = sessionResult.idToken
        settingsStore.authSessionId = sessionResult.sessionId
        settingsStore.authStrategy = strategyName

        // Decode token to get expiration date
        const decodedToken: { exp: number } = jwt_decode(sessionResult.idToken)
        settingsStore.authExpiresAt = decodedToken.exp * 1000
      }
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
      const result = await _post(
        settingsStore.authStrategy, '/refresh', {
          sessionId: settingsStore.authSessionId
        }
      ) as RefreshTokenResponse
      settingsStore.authToken = result.idToken
      settingsStore.authRefreshedAt = new Date().getTime()

      // Decode token to get expiration date
      const decodedToken: { exp: number } = jwt_decode(result.idToken)
      settingsStore.authExpiresAt = decodedToken.exp * 1000
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
    strategyName: string,
    url: string,
    data: any,
  ): Promise<any> {
    const fullUrl = env.getAuthUrl(strategyName) + url
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