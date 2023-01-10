import { Locator, Page } from "@playwright/test"
import { Component } from "./Component"
import { ListItem } from "./ListItem"

export class List<T extends ListItem=ListItem> extends Component {
  constructor(
    page: Page, locator: Locator,
    private activator: new (page: Page, locator: Locator) => T
  ) {
    super(page, locator)
  }

  async count() {
    const items = await this.locator.getByRole('listitem')
    return await items.count()
  }

  async getByTestId(id: string): Promise<T> {
    return new this.activator(this.page, this.locator.getByTestId(id))
  }
}