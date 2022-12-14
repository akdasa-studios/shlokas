import { test, expect } from '@playwright/test';

test('tap on verse opens verse dialog', async ({ page }) => {
  await page.goto('/home/library');

  // Click on the first verse
  const firstVerse = await page.getByText("BG 1.1").first()
  await firstVerse.click()

  // Wait dialog to be opened
  const verseDialog = await page.getByTestId("verseViewDialog").first()
  await verseDialog.waitFor({ state: "visible" })
  await expect(verseDialog).toBeVisible()

  // Wait dialog to be closed
  const closeButton = await page.getByTestId("closeVerseDialog").first()
  await closeButton.click()
  await verseDialog.waitFor({ state: "detached" })
})

test('click on add verse adds verse', async ({ page }) => {
  await page.goto('/home/library');

  // Click on the first verse
  const firstVerse = await page.getByText("BG 1.1").first()
  await firstVerse.click()

  // Wait dialog to be opened
  const verseDialog = await page.getByTestId("verseViewDialog").first()
  await verseDialog.waitFor({ state: "visible" })
  await expect(verseDialog).toBeVisible()

  // Wait dialog to be opened
  const addVerseToInbox = await page.getByTestId("addVerseToInbox").first()
  await addVerseToInbox.click()

  // Wait dialog to be closed
  await verseDialog.waitFor({ state: "detached" })

  // Wait for toast
  const toast = await page.getByText('Verse added').first()
  await toast.waitFor({ state: "visible", timeout: 1000 })
})
