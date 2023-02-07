import { Page } from "@playwright/test"

export class Account {
  constructor(private readonly page: Page) {}


  get signUpViaEmail() { return this.page.getByRole('button', { name: 'Sign Up'})  }
  get name()     { return this.page.getByRole('textbox', { name: 'Name' }) }
  get login()    { return this.page.getByRole('textbox', { name: 'EMail'}) }
  get password() { return this.page.getByRole('textbox', { name: 'Password' }) }
  get submit()   { return this.page.getByRole('button',  { name: 'Sign Up'}) }
  get verifyEmail() { return this.page.getByTestId('verifyEmail') }

  async sumbitAccount(login: string) {
    await this.name.type("Ivan Petrović")
    await this.login.type(login)
    await this.password.type("12345678")
    await this.submit.click()
  }
}