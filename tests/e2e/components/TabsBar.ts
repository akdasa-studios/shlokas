import { Page } from "@playwright/test"

export class TabsBar {
  constructor(private readonly page: Page) {}

  get inboxTab() { return this.page.getByTestId('inbox-tab') }
  get inboxEmpty() { return this.page.getByTestId("inboxEmpty") }
  get inboxBadge() { return this.page.getByTestId("inbox-tab-badge") }
}