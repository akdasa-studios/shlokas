import { expect, test } from '@playwright/test'
import { Account, Application, TabsBar } from '../components'
import { addCardsToReview } from '../scenarios'
import { logIn, logInNewDevice, signUp } from '../scenarios/accounts'


test.beforeEach(async ({ page }) => {
  await new Application(page)
      .goto("/home/library", { tutorialEnabled: false })
})

test.describe('Settings › Account › Sync', () => {
  test('Sync data', async ({ page, context, browser }) => {
    const uniqueEmail = Math.random().toString(36).substr(2, 5)
    const email       = `${uniqueEmail}@test.rs`

    // device1: register and login
    const account1 = new Account(page)
    await addCardsToReview(page, ["BG 1.1"])
    await signUp(context, page, email)
    await logIn(page, email)
    await account1.sync.click()

    // device2: login
    const [context2, page2] = await logInNewDevice(browser, email)
    const account2 = new Account(page2)
    const tabs2 = new TabsBar(page2)
    await account2.sync.click()
    await expect(tabs2.reviewBadge).toHaveText("1")

    page2.close()
    context2.close()
  })
})