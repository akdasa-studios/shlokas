import { AuthenticationStrategy, AuthenticationResult } from './strategy'


export class EmailAuthenticationStrategy implements AuthenticationStrategy {
  //@ts-ignore
  async authenticate(data: any): Promise<AuthenticationResult> {
    console.log(`Signing in with email "${data.email}", "${data.code}"`, data.email && !data.code)
    if (data.email && !data.code) {
      // TODO:
      //@ts-ignore
      return { authorizationCode: data.email }
    } else if (data.email && data.code) {
      //@ts-ignore
      return { authorizationCode: `${data.email} ${data.code}` }
    }
  }
}