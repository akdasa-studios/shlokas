import { Locator, Page } from "@playwright/test"

export abstract class Component {
  constructor(
    protected readonly page: Page,
    protected readonly locator: Locator
  ) {
  }

  async isVisible() {
    return await this.locator.isVisible()
  }

  async click() {
    return await this.locator.click()
  }
}