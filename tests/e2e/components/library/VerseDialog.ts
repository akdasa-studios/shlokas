import { Locator, Page } from '@playwright/test'
import { Component, Button } from '$/e2e/components/core'


export class VerseDialog extends Component {
  public readonly addVerse: Button
  public readonly close: Button

  constructor(page: Page, locator: Locator) {
    super(page, locator)
    this.addVerse = new Button(page, locator.getByTestId("addVerseToInbox"))
    this.close = new Button(page, locator.getByTestId("closeVerseDialog"))
  }
}
