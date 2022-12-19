import { test, expect } from '@playwright/test';
import { Application } from './pages/Application';

let app: Application

test.beforeEach(async ({ page }, testInfo) => {
  app = new Application(page)
  await app.library.open()
})

test.describe('Add verse', () => {
  test('Add verse to the Inbox deck', async () => {
    const verseModal = await app.library.openVerse('BG 1.1')
    await verseModal.clickAddButton()

    await app.toasts.expectToastWithText('Verse BG 1.1 added to inbox')
    await app.tabsBar.expectInboxBadgeValueIs('2')
    await app.library.expectStatusBadgeOfVerseToBe('BG 1.1', 'INBOX')
    await verseModal.expectClosed()
  })

  test('Revert adding verse to the Inbox deck', async () => {
    const verseModal = await app.library.openVerse('BG 1.1')
    await verseModal.clickAddButton()
    await app.toasts.clickRevertOnToast()

    await app.tabsBar.expectInboxBadgeValueIs('')
    await app.library.expectStatusBadgeOfVerseToBe('BG 1.1', undefined)
  })

  test('Add button is hidden if the verse has already been added', async () => {
    const verseModal1 = await app.library.openVerse('BG 1.1')
    await verseModal1.clickAddButton()

    const verseModal2 = await app.library.openVerse('BG 1.1')
    await verseModal2.expectAddButtonIsHidden()
  })
})

test.describe('Search', () => {
  test('By verse number', async () => {
    const items = await app.library.search('BG 1.1')
    expect(await items.count()).toEqual(1)
  })

  test('By text', async () => {
    const items = await app.library.search('army')
    expect(await app.page.getByTestId('BG 1.2').count()).toEqual(1)
    expect(await items.count()).toEqual(1)
  })

  test('Nothing found', async () => {
    const items = await app.library.search('NOTHING FOUND')
    expect(await items.count()).toEqual(0)
  })
})