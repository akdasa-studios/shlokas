import { expect, test } from '@playwright/test'
import { ReviewDeckPage } from '../components'


test.describe('Review Deck', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/home/review')
  })

  test.describe('Tutorial Cards', () => {
    test.beforeEach(async ({ page }) => {
      const review = new ReviewDeckPage(page)
      for (const card of review.tutorialCardIds) {
        await review.swipeCardLeft(page.getByTestId(card))
      }
    })


    test('Swipe all tutorial cards', async ({ page }) => {
      const review = new ReviewDeckPage(page)
      await expect(review.reviewEmpty).toBeVisible()
    })

    test('Saves state', async ({ page }) => {
      const reviewEmpty = new ReviewDeckPage(page)
      // eslint-disable-next-line playwright/no-wait-for-timeout
      await page.waitForTimeout(500) // give time to save
      await page.reload()
      await expect(reviewEmpty.reviewEmpty).toBeVisible()
    })
  })

})