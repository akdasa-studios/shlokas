
export interface AuthenticationResult {
  token: string,
  authorizationCode: string,
  email?: string|null,
  user: {
    id?: string|null,
    givenName?: string|null,
    familyName?: string|null
  }
}

export interface AuthenticationStrategy {
  get name(): string
  authorize(data: any): Promise<AuthenticationResult>
}