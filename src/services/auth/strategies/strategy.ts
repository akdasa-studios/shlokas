
export interface AuthenticationResult {
  authorizationCode: string,
  token: string,
  email?: string|null,
  user: {
    id?: string|null,
    givenName?: string|null,
    familyName?: string|null
  }
}

export interface AuthenticationStrategy {
  authenticate(data: any): Promise<AuthenticationResult>
}