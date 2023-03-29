import { expect, test } from '@playwright/test'
import { Account, Application, LibraryPage, Settings, TabsBar } from '../components'
import { addCardsToInbox, addCardsToReview, nextDays } from '../scenarios'
import { logIn, logInNewDevice, signUp, sync } from '../scenarios/accounts'


test.beforeEach(async ({ page }) => {
  await new Application(page)
    .goto('/home/library', { tutorialEnabled: false })
  await page.evaluate(() =>
    localStorage.setItem('mailcatcherSeparatorHeight', '400')
  )
})

test.describe('Settings › Account › Sync', () => {
  test('Sync data', async ({ page, context, browser }) => {
    const uniqueEmail = Math.random().toString(36)
    const email       = `${uniqueEmail}@test.rs`

    // device1: register and login
    const account1 = new Account(page)
    await addCardsToReview(page, ['BG 1.1'])
    await signUp(context, page, email)
    await logIn(page, email)
    await account1.sync.click()
    await account1.syncingProgress.waitFor({ state: 'hidden' })

    // device2: login
    const [context2, page2] = await logInNewDevice(browser, email)
    const app2 = new Application(page2)
    const account2 = new Account(page2)
    const tabs2 = new TabsBar(page2)
    await account2.sync.click()
    await account2.sync.click()
    await account2.syncingProgress.waitFor({ state: 'hidden' })
    await app2.goto('/home/review', { date: nextDays(1) })
    await expect(tabs2.reviewBadge).toHaveText('1')

    await context2.close()
  })

  test('Sync verse status', async ({ page, context, browser }) => {
    const uniqueEmail = Math.random().toString(36)
    const email = `${uniqueEmail}@test.rs`

    // device1: register and login
    const account1 = new Account(page)
    await addCardsToReview(page, ['BG 1.1'])
    await signUp(context, page, email)
    await logIn(page, email)
    await account1.sync.click()
    await account1.syncingProgress.waitFor({ state: 'hidden' })

    // device2: login
    const [context2, page2] = await logInNewDevice(browser, email)
    const account2 = new Account(page2)
    await account2.sync.click()
    await account2.sync.click()
    await account2.syncingProgress.waitFor({ state: 'hidden' })
    const tabs2    = new TabsBar(page2)
    const library2 = new LibraryPage(page2)
    await tabs2.libraryTab.click()

    await expect(library2.verseBadge('BG 1.1')).toHaveText('Review')

    await context2.close()
  })

  test('Sync conflict', async ({ page, context, browser }) => {
    const uniqueEmail = Math.random().toString(36)
    const email = `${uniqueEmail}@test.rs`

    // device1: register and login
    const account1 = new Account(page)
    await addCardsToReview(page, ['BG 1.1'])
    await signUp(context, page, email)
    await logIn(page, email)
    await account1.sync.click()
    await account1.syncingProgress.waitFor({ state: 'hidden' })

    // device2: login
    const [context2, page2] = await logInNewDevice(browser, email)
    const app2      = new Application(page2)
    const tabs2     = new TabsBar(page2)
    const account2  = new Account(page2)
    const settings2 = new Settings(page2)

    // device2: add same verse
    await tabs2.libraryTab.click()
    await addCardsToReview(page2, ['BG 1.1'])

    // device2: sync
    await tabs2.settingsTab.click()
    await settings2.account.click()
    await account2.sync.click()
    await account2.sync.click()
    await account2.syncingProgress.waitFor({ state: 'hidden' })
    await app2.goto('/home/review', { date: nextDays(1) })
    await expect(tabs2.reviewBadge).toHaveText('1')
    await context2.close()
  })

  test('Sync verse twice', async ({ page, context, browser }) => {
    const uniqueEmail = Math.random().toString(36)
    const email = `${uniqueEmail}@test.rs`

    // device1: register and login
    const account1 = new Account(page)
    await addCardsToReview(page, ['BG 1.1'])
    await signUp(context, page, email)
    await logIn(page, email)
    await account1.sync.click()
    await account1.syncingProgress.waitFor({ state: 'hidden' })

    // device2: login
    const [context2, page2] = await logInNewDevice(browser, email)
    const account2  = new Account(page2)
    const app2      = new Application(page2)
    const tabs2     = new TabsBar(page2)
    const settings2 = new Settings(page2)
    await tabs2.libraryTab.click()
    await addCardsToInbox(page2, ['BG 1.1'])
    await tabs2.settingsTab.click()
    await settings2.account.click()
    await account2.sync.click()
    await account2.sync.click()
    await account2.syncingProgress.waitFor({ state: 'hidden' })

    await expect(tabs2.inboxBadge).toBeHidden() // already removed on device1. But still on device2
    await app2.goto('/home/review', { date: nextDays(1) })
    await expect(tabs2.reviewBadge).toHaveText('1')

    await context2.close()
  })
})