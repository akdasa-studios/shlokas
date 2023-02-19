import { expect, test } from '@playwright/test'
import { Application, ReviewDeckPage, TabsBar } from '../components'


test.describe('Review Deck', () => {
  test.beforeEach(async ({ page }) => {
    await new Application(page)
      .goto('/home/library', { tutorialEnabled: false })
  })

  /**
   * Review deck is empty if user has not added any cards.
   */
  test('Deck is empty', async ({ page }) => {
    const tabs = new TabsBar(page)
    const review = new ReviewDeckPage(page)

    // act:
    await tabs.reviewTab.click()

    // assert:
    await expect(review.reviewEmpty).toBeVisible()
    await expect(review.cardsCountDueToTomorrow).toBeHidden()
  })
})