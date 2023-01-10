import { expect, Locator, Page } from '@playwright/test'
import { TabWithBadge } from './TabWithBadge'
import { Component } from './components/Component'

export class TabsBar extends Component {
  public readonly inboxTab: TabWithBadge
  public readonly reviewTab: TabWithBadge

  constructor(page: Page, locator: Locator) {
    super(page, locator)
    this.inboxTab = new TabWithBadge(
      page,
      this.locator.getByTestId('inbox-tab'),
      this.locator.getByTestId('inbox-tab-badge'))
    this.reviewTab = new TabWithBadge(
      page,
      this.locator.getByTestId('review-tab'),
      this.locator.getByTestId('review-tab-badge')
    )
  }

  async expectInboxBadgeValueIs(number: string) {
    const counterBadge = await this.page.getByTestId("inbox-tab-badge").first()
    if (number) {
      await expect(counterBadge).toHaveText(number)
    } else {
      await expect(counterBadge).toBeHidden()
    }
  }

  async expectReviewBadgeValueIs(number: string) {
    const counterBadge = await this.page.getByTestId("review-tab-badge").first()
    if (number) {
      await expect(counterBadge).toHaveText(number)
    } else {
      await expect(counterBadge).toBeHidden()
    }
  }
}
