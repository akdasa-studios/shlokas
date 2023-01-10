import { Locator, Page } from "@playwright/test"
import { Component } from "./Component"
import { Button } from "./Button"


export class Toast extends Component {
  public readonly revert: Button

  constructor(page: Page, locator: Locator) {
    super(page, locator)
    this.revert = new Button(page, page.getByText("Revert"))
  }
}
