import { AuthenticationStrategy, AuthenticationResult } from './strategy';


export class EmailAuthenticationStrategy implements AuthenticationStrategy {
  constructor(private readonly url: string) {}
  get name(): string {
    return 'email'
  }

  //@ts-ignore
  async authorize(data: any): Promise<AuthenticationResult> {
    console.log(`lgoinig in with email "${data.email}", "${data.code}"`, data.email && !data.code)
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