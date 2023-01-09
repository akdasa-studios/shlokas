import { Locator, Page } from "@playwright/test"
import { Component } from "./Component"
import { ListItem } from "./ListItem"

export class List extends Component {
  constructor(page: Page, locator: Locator) {
    super(page, locator)
  }

  async count() {
    const items = await this.locator.getByRole('listitem')
    return await items.count()
  }

  async getByTestId(id: string) {
    return new ListItem(this.page, this.locator.getByTestId(id))
  }
}