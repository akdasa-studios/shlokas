import { ReviewCardType } from '@akdasa-studios/shlokas-core'
import { Locator, Page } from '@playwright/test'
import { testId } from '@/app/TestId'

export class ReviewDeckPage {
  constructor(private readonly page: Page) {}

  get good() { return this.page.getByTestId('good') }
  get forgot() { return this.page.getByTestId('forgot') }

  card(verseNumber: string, type: ReviewCardType) {
    return this.page.getByTestId(testId(verseNumber, 'card', type))
  }

  get tutorialCardIds() {
    return [
      'tutorial.review.questionAnswer',
      'tutorial.review.intervals',
    ]
  }
  get reviewEmpty() { return this.page.getByTestId('reviewEmpty') }
  get cardsCountDueToTomorrow() { return this.page.getByTestId('cardsCountDueToTomorrow') }

  async swipeCardUp(locator: Locator) {
    await locator.dragTo(locator, {
      sourcePosition: { x: 40, y: 380 },
      targetPosition: { x: 40, y: 240 }
    })
    await locator.waitFor({ state: 'detached' })
  }
}