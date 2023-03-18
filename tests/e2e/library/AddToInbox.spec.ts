import { test , expect } from '@playwright/test'
import { LibraryPage, TabsBar, VerseDetailsPage } from '../components'


test.describe('Library › Add to Inbox', () => {
  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  let library: LibraryPage
  let verse: VerseDetailsPage
  let tabsBar: TabsBar


  /* -------------------------------------------------------------------------- */
  /*                                    Hooks                                   */
  /* -------------------------------------------------------------------------- */

  test.beforeEach(async ({ page }) => {
    library = new LibraryPage(page)
    tabsBar = new TabsBar(page)
    verse = new VerseDetailsPage(page)
    await page.goto('/home/library')
  })

  test.afterEach(async ({ page }) => {
    await page.close()
  })


  /* -------------------------------------------------------------------------- */
  /*                                    Tests                                   */
  /* -------------------------------------------------------------------------- */

  test('Add verse to the Inbox deck', async () => {
    await library.verse('BG 1.1').click()
    await verse.addButton.click()

    await expect(library.verseBadge('BG 1.1')).toContainText('Inbox')
    await expect(tabsBar.inboxBadge).toContainText('2')
  })

  test('Add button is disabled if verse has already been added', async () => {
    await library.verse('BG 1.1').click()
    await verse.addButton.click()
    await library.verse('BG 1.1').click()

    await expect(verse.addButton).toBeDisabled()
  })

  test('Back returns to library', async ({ page }) => {
    await library.verse('BG 1.1').click()
    await verse.backButton.click()

    await expect(page).toHaveURL('/home/library')
    await expect(library.searchbar).toBeVisible()
  })
})
