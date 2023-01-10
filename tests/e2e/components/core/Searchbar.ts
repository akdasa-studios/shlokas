import { Locator, Page } from "@playwright/test"
import { Component } from "./Component"

export class Searchbar extends Component {
  constructor(page: Page, locator: Locator) {
    super(page, locator)
  }

  async search(text: string) {
    await this.locator.click()
    await this.locator.type(text)
    await this.locator.press("Enter")
    await this.page.waitForTimeout(1000)
  }
}
