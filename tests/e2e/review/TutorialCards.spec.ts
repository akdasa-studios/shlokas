import { expect, test } from '@playwright/test'
import { Application, ReviewDeckPage } from '../components'


test.describe('Review Deck › Tutorial Cards', () => {
  test.beforeEach(async ({ page }) => {
    await new Application(page)
      .goto("/home/review", { tutorialEnabled: true })
  })

  /**
   * When user opens the review deck for the first time, they should
   * see tutorial cards. When they swipe all the tutorial cards, they
   * should see a message that the review deck is empty.
   */
  test('Swipe all tutorial cards', async ({ page }) => {
    const review = new ReviewDeckPage(page)

    // act:
    for (const card of review.tutorialCardIds) {
      await review.swipeCardLeft(page.getByTestId(card))
    }

    // assert:
    // 1. review empty message is shown
    await expect(review.reviewEmpty).toBeVisible()
  })

  /**
   * Completed tutorial cards should not be shown again.
   */
  test('Saves state', async ({ page }) => {
    const review = new ReviewDeckPage(page)

    // act:
    for (const card of review.tutorialCardIds) {
      await review.swipeCardLeft(page.getByTestId(card))
    }

    // assert:
    // 1. review empty message is shown after reload
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await page.waitForTimeout(500) // give time to save
    await page.reload()
    await expect(review.reviewEmpty).toBeVisible()
  })
})