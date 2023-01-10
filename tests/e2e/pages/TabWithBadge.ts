import { Locator, Page } from '@playwright/test'
import { Badge } from './components'
import { Component } from './components/Component'


export class TabWithBadge extends Component {
  public readonly badge: Badge
  constructor(page: Page, locator: Locator, badgeLocator: Locator) {
    super(page, locator)
    this.badge = new Badge(page, badgeLocator)
  }
}
