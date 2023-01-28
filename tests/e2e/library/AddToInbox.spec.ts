import { test , expect } from '@playwright/test'


test.describe('Library › Add to Inbox', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/home/library?tutorialEnabled=false')
  })


  test('Add verse to the Inbox deck', async ({ page }) => {
    await page.getByRole('heading', { name: 'BG 1.1' }).click()
    await page.getByRole('button', { name: 'Add' }).click()
    await page.getByText('Verse BG 1.1 added to inbox').waitFor()

    await expect(page.getByTestId('bg 1.1-badge')).toContainText("INBOX")
    await expect(page.getByTestId('inbox-tab-badge')).toContainText("2")
  })

  test('Revert adding verse to the Inbox deck', async ({ page }) => {
    await page.getByRole('heading', { name: 'BG 1.1' }).click()
    await page.getByRole('button', { name: 'Add' }).click()
    await page.getByTestId('bg 1.1-badge').waitFor({ state: 'visible' })
    await page.getByRole('button', { name: 'Revert' }).click()

    await expect(page.getByTestId('bg 1.1-badge')).toBeHidden()
    await expect(page.getByTestId('inbox')).toBeHidden()
  })

  test('Add button is hidden if the verse has already been added', async ({ page }) => {
    await page.getByRole('heading', { name: 'BG 1.1' }).click()
    await page.getByRole('button', { name: 'Add' }).click()
    await page.getByRole('heading', { name: 'BG 1.1' }).click()

    await expect(page.getByRole('button', { name: 'Add' })).toBeHidden()
  })

  test('Cancel closes dialog', async ({ page }) => {
    await page.getByRole('heading', { name: 'BG 1.1' }).click()
    await page.getByRole('button', { name: 'close' }).click()

    await expect(page.getByTestId('addVerseToInbox')).toBeHidden()
  })
})
