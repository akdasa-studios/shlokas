import { Locator, Page } from '@playwright/test'
import { Button } from './components/Button'
import { Component } from './components/Component'

export class LibraryModalDialog extends Component {
  public readonly addVerse: Button
  public readonly close: Button

  constructor(page: Page, locator: Locator) {
    super(page, locator)
    this.addVerse = new Button(page, locator.getByTestId("addVerseToInbox"))
    this.close = new Button(page, locator.getByTestId("closeVerseDialog"))
  }
}
