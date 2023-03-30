import { ReviewCardType } from '@akdasa-studios/shlokas-core'
import { expect, test } from '@playwright/test'
import { Application, ReviewDeckPage } from '../components'
import { addCardsToReview, nextDays } from '../scenarios'

test.describe('Review Deck › Grade Buttons', () => {
  test.beforeEach(async ({ page }) => {
    const app = new Application(page)

    await app.goto('/home/library', {
      tutorialEnabled: false,
      libraryLastSyncDate: 9999999999999
    })
    await addCardsToReview(page, ['BG 1.1'])
    await app.goto('/home/review', {
      date: nextDays(1),
      tutorialEnabled: false,
      libraryLastSyncDate: 9999999999999
    })
  })

  /**
   * When user clics "Good" button, the card should be removed from the
   * review deck, because it is scheduled for another day.
   */
  test('Answer "Good"', async ({ page }) => {
    const review = new ReviewDeckPage(page)
    const card   = review.card('BG 1.1', ReviewCardType.NumberToTranslation)

    // act:
    await card.click()
    await review.good.click()

    // assert:
    await expect(review.reviewEmpty).toBeVisible()
  })

  /**
   * When user clicks "Forgot" button, the card should be shown again
   * in the review deck.
   */
  test('Answer "Forgot" for the last card', async ({ page }) => {
    const review = new ReviewDeckPage(page)
    const card   = review.card('BG 1.1', ReviewCardType.NumberToTranslation)

    // act:
    await card.click()
    await review.forgot.click()

    // assert:
    // 1. card is still in the review deck
    await expect(review.reviewEmpty).toBeHidden()
    await expect(card).toBeVisible()
    await expect(card).toHaveAttribute('data-index', '0')
  })
})