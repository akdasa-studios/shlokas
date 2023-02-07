import { Page } from "@playwright/test"

export class Settings {
  constructor(private readonly page: Page) {}

  get account() { return this.page.getByTestId("account") }
}