import { Page } from "@playwright/test"

export class TabsBar {
  constructor(private readonly page: Page) {}

  get inboxEmpty() { return this.page.getByTestId("inboxEmpty") }

  get inboxTab() { return this.page.getByTestId('inbox-tab') }
  get reviewTab() { return this.page.getByTestId('review-tab') }

  get inboxBadge() { return this.page.getByTestId("inbox-tab-badge") }
  get reviewBadge() { return this.page.getByTestId("review-tab-badge") }

  get settingsTab() { return this.page.getByTestId("settings-tab") }
}