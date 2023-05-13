import { SignInWithApple } from '@capacitor-community/apple-sign-in'
import { AuthenticationStrategy, AuthenticationResult } from './strategy'


export class AppleAuthenticationStrategy implements AuthenticationStrategy {
  async authenticate(): Promise<AuthenticationResult> {
    const result = (await SignInWithApple.authorize({
      clientId: 'com.akdasa.shlokas',
      redirectURI: 'https://jocular-torte-90cd8e.netlify.app/welcome',
      scopes: 'email name',
    })).response

    return {
      token: result.identityToken,
      authorizationCode: result.authorizationCode,
      email: result.email,
      user: {
        id: result.user,
        givenName: result.givenName,
        familyName: result.familyName
      }
    }
  }
}