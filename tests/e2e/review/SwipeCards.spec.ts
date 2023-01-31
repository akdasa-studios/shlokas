import { ReviewCardType } from '@akdasa-studios/shlokas-core'
import { expect, test } from '@playwright/test'
import { Application, ReviewDeckPage , TabsBar } from '../components'
import { addCardsToReview } from '../scenarios'


test.describe('Review Deck › Swipe Cards', () => {
  test.beforeEach(async ({ page }) => {
    await new Application(page)
      .goto("/home/library", { tutorialEnabled: false })
    await addCardsToReview(page, ['BG 1.1', 'BG 2.13'])
  })

  /**
   * When user opens the review deck, they should see cards if he has
   * added cards to review.
   */
  test('Swipe all cards left', async ({ page }) => {
    const tabs   = new TabsBar(page)
    const review = new ReviewDeckPage(page)

    // act:
    await tabs.reviewTab.click()
    for (const verseNumber of ['BG 1.1', 'BG 2.13']) {
      const cardLocator = review.card(verseNumber, ReviewCardType.NumberToTranslation)
      await review.swipeCardLeft(cardLocator)
      await cardLocator.waitFor({ state: 'detached' })
    }

    // assert:
    // 1. review badge should be hidden because all cards are swiped
    // 2. review deck should be empty - no cards to review
    await expect(tabs.reviewBadge).toBeHidden()
    await expect(review.reviewEmpty).toBeVisible()
  })
})