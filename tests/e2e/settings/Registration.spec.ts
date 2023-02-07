import { test, expect } from '@playwright/test'
import { Account, Application, Settings, TabsBar } from '../components'


test.beforeEach(async ({ page }) => {
  const tabs = new TabsBar(page)
  await new Application(page)
      .goto("/home/library", { tutorialEnabled: false })
  await tabs.settingsTab.click()
})

test.describe('Settings › Account › Email', () => {
  test('Register new account', async ({ page, context }) => {
    const settings = new Settings(page)
    const account = new Account(page)
    const uniqueEmail = Math.random().toString(36).substr(2, 5)
    const login = `${uniqueEmail}@test.rs`

    // act
    await settings.account.click()
    await account.signUpViaEmail.click()
    await account.sumbitAccount(login)

    //
    await expect(account.verifyEmail).toBeVisible()

    // 1. open mail client and confirm email
    const mailPage = await context.newPage()
    await mailPage.goto('http://localhost:1080/')
    await mailPage.getByRole('cell', { name: `<${uniqueEmail}@test.rs>` }).first().click()
    await mailPage.frameLocator('iframe').getByRole('link', { name: 'Confirm email' }).click()
    await mailPage.frameLocator('iframe').getByText('Email has been confirmed!').click()

    // 2. log in
    await page.bringToFront()
    await page.getByRole('button', { name: 'Log In' }).click()
    await page.getByRole('dialog').waitFor()
    await page.getByRole('button', { name: 'Log In' }).click()

    // assert:
    await expect(page.getByText("Welcome back!")).toBeVisible()
  })
})