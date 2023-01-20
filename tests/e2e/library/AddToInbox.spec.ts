import { test , expect } from '@playwright/test'
import { ApplicationPage } from '$/e2e/components'

let app: ApplicationPage

test.beforeEach(async ({ page }) => {
  app = new ApplicationPage(page)
  await app.library.open()
})

test.describe('Library › Add to Inbox', () => {
  test('Add verse to the Inbox deck', async () => {
    await app.library.openVerse('BG 1.1')
    await app.library.verseDialog.waitFor()
    await app.library.verseDialog.addVerse.click()

    await app.library.verseAddedToast.waitFor()
    const inboxBadge = await app.tabsBar.inboxTab.badge.textContent()
    const toastText  = await app.library.verseAddedToast.textContent()
    const verseItem  = await app.library.versesList.getByTestId('bg 1.1')
    const verseBadge = await verseItem.badge.textContent()

    await app.library.verseDialog.waitFor("hidden")
    const dialogOpen = await app.library.verseDialog.isVisible()

    expect(toastText).toEqual('Verse BG 1.1 added to inbox')
    expect(inboxBadge).toEqual('2')
    expect(verseBadge).toEqual('INBOX')
    expect(dialogOpen).toBeFalsy()
  })

  test('Revert adding verse to the Inbox deck', async () => {
    await app.library.openVerse('BG 1.1')
    await app.library.verseDialog.waitFor()
    await app.library.verseDialog.addVerse.click()
    await app.library.verseAddedToast.revert.click()
    await app.library.verseAddedToast.revert.waitFor("hidden")

    await app.tabsBar.inboxTab.badge.waitFor('detached')
    await app.tabsBar.inboxTab.badge.waitFor('detached')

    const verseItem  = await app.library.versesList.getByTestId('bg 1.1')
    await verseItem.badge.waitFor('detached')
  })

  test('Add button is hidden if the verse has already been added', async () => {
    await app.library.openVerse('BG 1.1')
    await app.library.verseDialog.waitFor()
    await app.library.verseDialog.addVerse.click()

    await app.library.openVerse('BG 1.1')
    const isVisible = await app.library.verseDialog.addVerse.isVisible()
    expect(isVisible).toBeFalsy()
  })

  test('Cancel closes dialog', async () => {
    await app.library.openVerse('BG 1.1')
    await app.library.verseDialog.waitFor()
    await app.library.verseDialog.close.click()
    await app.library.verseDialog.waitFor("hidden")

    const verseItem  = await app.library.versesList.getByTestId('bg 1.1')
    const verseBadge = await verseItem.badge.isVisible()
    expect(verseBadge).toBeFalsy()
  })
})
