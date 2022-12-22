import { InboxCardType } from '@akdasa-studios/shlokas-core';
import { test } from '@playwright/test';
import { Application } from './pages/Application';

let app: Application

test.beforeEach(async ({ page }) => {
  app = new Application(page)
  await app.library.open()
})

test.describe('Swipe Cards', () => {
  test('Swipe card right', async () => {
    const verseModal = await app.library.openVerse('BG 1.1')
    await verseModal.clickAddButton()
    await app.inboxDeck.open()
    await app.inboxDeck.swipeCard(
      'BG 1.1', InboxCardType.Translation, "right"
    )
    await app.inboxDeck.expectCardIndex(
      'BG 1.1', InboxCardType.Translation, 1
    )
    await app.tabsBar.expectInboxBadgeValueIs("2")
  })

  test('Swipe card top', async () => {
    const verseModal = await app.library.openVerse('BG 1.1')
    await verseModal.clickAddButton()

    await app.inboxDeck.open()
    await app.inboxDeck.swipeCard(
      'BG 1.1', InboxCardType.Translation, "top"
    )
    await app.tabsBar.expectInboxBadgeValueIs("1")
  })
})
