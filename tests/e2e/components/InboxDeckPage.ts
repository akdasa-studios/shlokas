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
      sourcePosition: { x: 90, y: 160 },
      targetPosition: { x: 10,  y: 160 }
    })
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await this.page.waitForTimeout(250)
  }

  async swipeCardUp(locator: Locator) {
    // Safari is a piece of shit...
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await this.page.waitForTimeout(1000)

    await this.page.mouse.move(40, 580)
    await this.page.mouse.down()
    await this.page.mouse.move(40, 240, { steps: 10 })
    await this.page.mouse.up()

    // Seriously
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await this.page.waitForTimeout(500)

    // await locator.dragTo(locator, {
    //   sourcePosition: { x: 40, y: 380 },
    //   targetPosition: { x: 40, y: 240 }
    // })
    await locator.waitFor({ state: 'detached' })
  }
}