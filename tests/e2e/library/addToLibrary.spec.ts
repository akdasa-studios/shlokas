import { test } from '@playwright/test';
import { Application } from './pages/Application'

test('tap on verse opens verse dialog', async ({ page }) => {
  const app = new Application(page)
  await app.library.open()
  const libraryVerseModal = await app.library.openVerse('BG 1.1')
  await libraryVerseModal.close()
})

test('click on add verse adds verse', async ({ page }) => {
  const app = new Application(page)

  await app.library.open()
  const verseModal = await app.library.openVerse('BG 1.1')
  await verseModal.addVerse()
  await app.toasts.waitForToastWithText('Verse BG 1.1 added to inbox')
  await app.tabsBar.inboxBadgeValueIs("2")
})

test('revert added verse', async ({ page }) => {
  const app = new Application(page)
  await app.library.open()
  const verseModal = await app.library.openVerse('BG 1.1')
  await verseModal.addVerse()
  await app.toasts.clickRevertOnToast()
  await app.tabsBar.inboxBadgeValueIs("")
})
