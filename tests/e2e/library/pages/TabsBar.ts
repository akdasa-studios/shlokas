import { expect, Page } from '@playwright/test';

export class TabsBar {
  constructor(public readonly page: Page) { }

  async expectInboxBadgeValueIs(number: string) {
    const counterBadge = await this.page.getByTestId("inboxCounterBadge").first();
    if (number) {
      await expect(counterBadge).toHaveText(number);
    } else {
      await expect(counterBadge).toBeHidden();
    }
  }

  async expectReviewBadgeValueIs(number: string) {
    const counterBadge = await this.page.getByTestId("reviewCounterBadge").first();
    if (number) {
      await expect(counterBadge).toHaveText(number);
    } else {
      await expect(counterBadge).toBeHidden();
    }
  }
}
