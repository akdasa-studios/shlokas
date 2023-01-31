import { ReviewCardType } from '@akdasa-studios/shlokas-core'
import { expect, test } from '@playwright/test'
import { Application, ReviewDeckPage, TabsBar } from '../components'
import { addCardsToReview, nextDays } from '../scenarios'

test.describe('Review Deck › Schedule', () => {
  test.beforeEach(async ({ page }) => {
    await new Application(page)
      .goto("/home/library", { tutorialEnabled: false })
  })

  test.beforeEach(async ({ page }) => {
    await addCardsToReview(page, ['BG 1.1'])
  })

  /**
   * if user skips multiple days in a row, the review deck should
   * show all the cards that were scheduled for those days.
   */
  test('Skip multiple days', async ({ page }) => {
    const app  = new Application(page)
    const tabs = new TabsBar(page)

    // act:
    await app.goto('/home/review', { date: nextDays(10) })

    // assert:
    // 1. we create 6 cards per verse, so we should see 6 cards
    await (expect(tabs.reviewBadge)).toHaveText("6")
  })

  /**
   * Scheduled for the next day card should be shown on the next day.
   */
  test('Schedule card for the next day', async ({ page }) => {
    const app    = new Application(page)
    const review = new ReviewDeckPage(page)
    const tabs   = new TabsBar(page)

    // act:
    await tabs.reviewTab.click()
    await review.card('BG 1.1', ReviewCardType.NumberToTranslation).click()
    await review.good.click()
    await app.goto('/home/review', { date: nextDays(1) })

    // assert:
    // 1. one card scheduled for today and one card from yesterday
    await (expect(tabs.reviewBadge)).toHaveText("2")
  })
})