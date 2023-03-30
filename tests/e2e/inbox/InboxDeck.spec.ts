import { InboxCardType } from '@akdasa-studios/shlokas-core'
import { expect, test } from '@playwright/test'
import { Application, InboxDeckPage, LibraryPage, TabsBar, VerseDetailsPage } from '../components'


test.describe('Inbox Deck', () => {
  let tabsBar: TabsBar
  let inboxDeck: InboxDeckPage
  let libraryPage: LibraryPage
  let verseDetailsPage: VerseDetailsPage


  test.beforeEach(async ({ page }) => {
    tabsBar = new TabsBar(page)
    inboxDeck = new InboxDeckPage(page)
    libraryPage = new LibraryPage(page)
    verseDetailsPage = new VerseDetailsPage(page)

    await new Application(page).goto('/home/library', {
      tutorialEnabled: false,
      libraryLastSyncDate: 9999999999999
    })
  })

  test('Inbox is empty', async () => {
    await tabsBar.inboxTab.click()
    await expect(tabsBar.inboxEmpty).toBeVisible()
  })


  test.describe('Swipe Cards', () => {

    test.beforeEach(async ({ page }) => {
      await libraryPage.verse('BG 1.1').click()
      await verseDetailsPage.addButton.click()
      await verseDetailsPage.addButton.waitFor({ state: 'detached' })
      await tabsBar.inboxTab.click()

      // eslint-disable-next-line playwright/no-wait-for-timeout
      await page.waitForTimeout(500)
    })

    test('Swipe card side', async ({ page }) => {
      const cardLocator = page.getByTestId('bg 1.1-card-translation')
      await inboxDeck.swipeCardLeft(cardLocator)

      await expect(cardLocator).toHaveAttribute('data-index', '1')
      await expect(page.getByTestId('inbox-tab-badge')).toContainText('2')
    })

    test('Swipe card up', async ({ page }) => {
      const cardLocator = page.getByTestId('bg 1.1-card-translation')
      await inboxDeck.swipeCardUp(cardLocator)

      await expect(tabsBar.inboxBadge).toContainText('1')
    })

    test('Review badge', async ({ page }) => {
      const cardLocator = page.getByTestId('bg 1.1-card-translation')
      await inboxDeck.swipeCardUp(cardLocator)
      await tabsBar.libraryTab.click()
      await expect(libraryPage.verseBadge('BG 1.1')).toHaveText('Review')
    })

    test('Swipe all cards', async ({ page }) => {
      const cardTypesToSwipe = [
        InboxCardType.Translation,
        InboxCardType.Text,
      ]

      for (const cardTypeToSwipe of cardTypesToSwipe) {
        const cardLocator = page.getByTestId('bg 1.1-card-' + cardTypeToSwipe.toLowerCase())
        await inboxDeck.swipeCardUp(cardLocator)
      }

      await expect(page.getByTestId('inboxEmpty')).toBeVisible()
      await expect(page.getByTestId('inbox-tab-badge')).toBeHidden()
    })
  })
})