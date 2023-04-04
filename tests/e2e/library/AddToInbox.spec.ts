import { test , expect } from '@playwright/test'
import { Application, LibraryPage, TabsBar, VerseDetailsPage } from '../components'


test.describe('Library › Add to Inbox', () => {
  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  let app: Application
  let library: LibraryPage
  let verseDetails: VerseDetailsPage
  let tabsBar: TabsBar


  /* -------------------------------------------------------------------------- */
  /*                                    Hooks                                   */
  /* -------------------------------------------------------------------------- */

  test.beforeEach(async ({ page }) => {
    app = new Application(page)
    library = new LibraryPage(page)
    tabsBar = new TabsBar(page)
    verseDetails = new VerseDetailsPage(page)
    await app.goto('/home/library', {
      tutorialEnabled: false,
      libraryLastSyncDate: 9999999999999
    })
  })

  test.afterEach(async ({ page }) => {
    await page.close()
  })


  /* -------------------------------------------------------------------------- */
  /*                                    Tests                                   */
  /* -------------------------------------------------------------------------- */

  test('Add verse to the Inbox deck', async () => {
    await library.verse('BG 1.1').click()
    await verseDetails.addButton.click()

    await expect(library.verseBadge('BG 1.1')).toContainText('Inbox')
    await expect(tabsBar.inboxBadge).toContainText('2')
  })

  test('Add button is disabled if verse has already been added', async () => {
    await library.verse('BG 1.1').click()
    await verseDetails.addButton.click()
    await library.verse('BG 1.1').click()

    await expect(verseDetails.addButton).toBeDisabled()
  })

  test('Back returns to library', async () => {
    await library.verse('BG 1.1').click()
    await verseDetails.backButton.click()

    await expect(library.searchbar).toBeVisible()
  })
})
