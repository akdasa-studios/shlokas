import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth'
import { Capacitor } from '@capacitor/core'
import { AuthenticationStrategy, AuthenticationResult } from './strategy'

export class GoogleAuthenticationStrategy implements AuthenticationStrategy {
  constructor() {
    if (Capacitor.getPlatform() === 'web') {
      // Initialize the GoogleAuth plugin only when running on native
      GoogleAuth.initialize({
        clientId: '879891505939-bs3v8sm9mu1ti65eu81f3b8idtl8bakm.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
        grantOfflineAccess: true
      })
    }
  }

  async authenticate(): Promise<AuthenticationResult> {
    const result = await GoogleAuth.signIn()

    return {
      token: result.authentication.idToken,
      authorizationCode: result.serverAuthCode,
      email: result.email,
      user: {
        id: result.id,
        givenName: result.givenName,
        familyName: result.familyName
      }
    }
  }
}