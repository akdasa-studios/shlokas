import { test , expect } from '@playwright/test'
import { LibraryPage, TabsBar } from '../components'


test.describe('Library › Add to Inbox', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/home/library?tutorialEnabled=false')
  })


  test('Add verse to the Inbox deck', async ({ page }) => {
    const libraryPage = new LibraryPage(page)
    const tabsBar = new TabsBar(page)

    await libraryPage.verse('BG 1.1').click()
    await libraryPage.addVerseButton.click()
    await libraryPage.verseAddedBadge('BG 1.1').waitFor()

    await expect(libraryPage.verseBadge('BG 1.1')).toContainText('INBOX')
    await expect(tabsBar.inboxBadge).toContainText('2')
  })

  test('Revert adding verse to the Inbox deck', async ({ page }) => {
    const libraryPage = new LibraryPage(page)
    const tabsBar = new TabsBar(page)

    await libraryPage.verse('BG 1.1').click()
    await libraryPage.addVerseButton.click()
    await libraryPage.verseAddedBadge('BG 1.1').waitFor()
    await libraryPage.revertButton.click()

    await expect(libraryPage.verseBadge('BG 1.1')).toBeHidden()
    await expect(tabsBar.inboxBadge).toBeHidden()
  })

  test('Add button is hidden if the verse has already been added', async ({ page }) => {
    const libraryPage = new LibraryPage(page)

    await libraryPage.verse('BG 1.1').click()
    await libraryPage.addVerseButton.click()
    await libraryPage.verse('BG 1.1').click()

    await expect(libraryPage.addVerseButton).toBeHidden()
  })

  test('Cancel closes dialog', async ({ page }) => {
    const libraryPage = new LibraryPage(page)
    await libraryPage.verse('BG 1.1').click()
    await libraryPage.closeVerseDialog.click()

    await expect(page.getByTestId('addVerseToInbox')).toBeHidden()
  })
})
