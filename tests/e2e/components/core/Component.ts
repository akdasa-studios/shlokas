import { Locator, Page } from "@playwright/test"

export class Component {
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

  async waitFor(state? : "attached"|"detached"|"visible"|"hidden") {
    await this.locator.waitFor({ state })
  }

  async textContent() {
    return await this.locator.textContent()
  }
}