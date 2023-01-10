import { Locator, Page } from "@playwright/test"
import { Badge, ListItem } from "./components"

export class VerseListItem extends ListItem {
  public readonly badge: Badge

  constructor(page: Page, locator: Locator) {
    super(page, locator)
    this.badge = new Badge(page, locator.getByRole('status'))
  }
}