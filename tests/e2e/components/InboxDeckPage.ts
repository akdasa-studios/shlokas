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
    // await this.page.mouse.move(90, 160, { steps: 10 })
    // await this.page.mouse.down()
    // await this.page.mouse.move(10, 160, { steps: 100 })
    // await this.page.mouse.up()

    await locator.dragTo(locator, {
      sourcePosition: { x: 90, y: 160 },
      targetPosition: { x: 10,  y: 160 }
    })
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await this.page.waitForTimeout(500)
  }

  async swipeCardTop(locator: Locator) {
    // await this.page.mouse.move(40, 160, { steps: 10 })
    // await this.page.mouse.down()
    // await this.page.mouse.move(40, 160, { steps: 100 })
    // await this.page.mouse.up()

    await locator.dragTo(locator, {
      sourcePosition: { x: 40, y: 160 },
      targetPosition: { x: 40, y: 40 }
    })
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await this.page.waitForTimeout(500)
  }
}