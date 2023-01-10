import { Locator, Page } from '@playwright/test'
import { TabWithBadge } from './TabWithBadge'
import { Tab, Component } from './core'

export class TabsBar extends Component {
  public readonly libraryTab: Tab
  public readonly inboxTab: TabWithBadge
  public readonly reviewTab: TabWithBadge
  public readonly settingsTab: Tab

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
    this.settingsTab = new Tab(this.page, locator.getByTestId("settings-tab"))
    this.libraryTab = new Tab(this.page, locator.getByTestId("library-tab"))
  }
}
