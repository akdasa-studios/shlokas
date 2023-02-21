import { Locator, Page } from '@playwright/test'

export class InboxDeckPage {
  constructor(private readonly page: Page) {}

  get tutorialCardIds() {
    return [
      'tutorial.inbox.cards',
      'tutorial.inbox.overall',
      'tutorial.inbox.verse',
      'tutorial.inbox.final'
    ]
  }
  get inboxEmpty() { return this.page.getByTestId('inboxEmpty') }

  async swipeCardLeft(locator: Locator) {
    await locator.dragTo(locator, {
      sourcePosition: { x: 70, y: 160 },
      targetPosition: { x: 10,  y: 160 }
    })
  }

  async swipeCardTop(locator: Locator) {
    await locator.dragTo(locator, {
      sourcePosition: { x: 40, y: 160 },
      targetPosition: { x: 40, y: 0 }
    })
  }
}