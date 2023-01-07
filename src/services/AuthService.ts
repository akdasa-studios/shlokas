import { Result } from '@akdasa-studios/framework'

interface AuthToken {
  issued: number
  expires: number
  token: string
  password: string
  dbName: string
}

export class AuthService {
  private _host: string

  constructor(host: string) {
    this._host = host
  }

  async signUp(
    name: string,
    email: string,
    password: string,
  ): Promise<Result<boolean, string>> {
    const response = await this._post("register", {
      name, email, password, "confirmPassword": password,
    })
    if (response.error) { return Result.fail(response.error) }
    return Result.ok()
  }

  async logIn(
    email: string,
    password: string,
  ): Promise<Result<AuthToken, string>> {
    const response = await this._post("login", { "username": email, password })
    if (response.error) { return Result.fail(response.error) }
    return Result.ok({
      issued: response.issued,
      expires: response.expires,
      token: response.token,
      password: response.password,
      dbName: response.userDBs.supertest
    })
  }

  private async _post(url: string, data: any): Promise<any> {
    return (await fetch(`${this._host}/${url}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })).json()
  }
}