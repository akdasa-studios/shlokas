import { AuthenticationRequest, AuthenticationResponse } from '@akdasa-studios/shlokas-protocol'
import { AuthenticationStrategy } from './strategies'


export class AuthService {
  private _host: string

  constructor(host: string) {
    this._host = host
  }

  /**
   * Authenticate using specified strategy
   * @param strategy Strategy to use for authentication
   * @returns
   */
  async authenticate(
    strategy: AuthenticationStrategy,
    data?: any
  ) {
    // Authenticate using specified strategy
    const result1 = await strategy.authorize(data)
    console.log('result1', result1)

    // Create session using authorization code
    const authRequest: AuthenticationRequest = {
      authorizationCode: result1.authorizationCode
    }
    const result2: AuthenticationResponse = await this._post(strategy.name, authRequest)

    return {
      token: result2.idToken,
      sessionId: result2.sessionId,
      database: result2.collectionId
    }
  }

  /**
   * Refresh identity token
   * @param strategy Strategy
   * @param sessionId Session ID
   * @returns
   */
  public async refresh(
    strategy: AuthenticationStrategy,
    sessionId: string
  ) {
    const result = await this._post(strategy.name + '/refresh', {
      sessionId
    })
    return { token: result.idToken }
  }

  private async _post(url: string, data: any, headers = {}): Promise<any> {
    const response =  await fetch(`${this._host}/${url}`, {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         ...headers
       },
       body: JSON.stringify(data)
     })
     return response.json()
   }
}