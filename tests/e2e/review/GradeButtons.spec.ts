import { InboxCardType } from '@akdasa-studios/shlokas-core'
import { expect, test } from '@playwright/test'
import { testId } from '@/app/TestId'
import { ReviewDeckPage } from '../components'
import { InboxDeckPage } from './../components/InboxDeckPage'
import { LibraryPage } from './../components/LibraryPage'
import { TabsBar } from './../components/TabsBar'



test.describe('Grade Buttons', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/home/library?tutorialEnabled=false')
  })

  test.beforeEach(async ({ page }) => {
    const library = new LibraryPage(page)
    const inbox = new InboxDeckPage(page)
    const tabs = new TabsBar(page)
    await library.verse('BG 1.1').click()
    await library.addVerseButton.click()
    await tabs.inboxTab.click()

    for (const t of [InboxCardType.Translation, InboxCardType.Text]) {
      const cardLocator = page.getByTestId(testId('BG 1.1', 'card', t))
      await inbox.swipeCardTop(cardLocator)
    }

    await page.getByTestId('review-tab').click()
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await page.waitForTimeout(200) // firefox, webkit
  })


  test('Answer card', async ({ page }) => {
    const reviewEmpty = new ReviewDeckPage(page)
    const cardLocator = page.getByTestId("bg 1.1-card-numbertotranslation")
    await cardLocator.click()
    await page.getByTestId('good').click()

    await expect(reviewEmpty.reviewEmpty).toBeVisible()
  })

  test('Last card forgot', async ({ page }) => {
    const reviewEmpty = new ReviewDeckPage(page)
    const cardLocator = page.getByTestId("bg 1.1-card-numbertotranslation")
    await cardLocator.click()
    await page.getByTestId('forgot').click()

    await expect(reviewEmpty.reviewEmpty).toBeHidden()
    await expect(cardLocator).toBeVisible()
    await expect(cardLocator).toHaveAttribute('data-index', "0")
  })
})