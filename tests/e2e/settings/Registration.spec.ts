import { expect, test } from '@playwright/test'
import { Account } from '../components'
import { logIn, logInNewDevice, signUp } from '../scenarios/accounts'


test.describe('Settings › Account › Email', () => {
  test('Register new account', async ({ page, context }) => {
    const accountPage = new Account(page)
    const uniqueEmail = Math.random().toString(36)
    const email       = `${uniqueEmail}@test.rs`

    await signUp(context, page, email)
    await expect(accountPage.verifyEmail).toBeVisible()
    await logIn(page, email)
    await expect(page.getByText('Welcome back!')).toBeVisible()
  })

  test('Log In on another device', async ({ page, context, browser }) => {
    const uniqueEmail = Math.random().toString(36)
    const email       = `${uniqueEmail}@test.rs`

    // device1: register and login
    await signUp(context, page, email)
    await logIn(page, email)

    // device2: login
    const [context2, page2] = await logInNewDevice(browser, email)
    await expect(page2.getByText('Welcome back!')).toBeVisible()

    await page2.close()
    await context2.close()
  })
})