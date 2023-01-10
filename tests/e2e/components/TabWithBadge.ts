import { Locator, Page } from '@playwright/test'
import { Badge } from './core'
import { Component } from './core/Component'


export class TabWithBadge extends Component {
  public readonly badge: Badge
  constructor(page: Page, locator: Locator, badgeLocator: Locator) {
    super(page, locator)
    this.badge = new Badge(page, badgeLocator)
  }
}
