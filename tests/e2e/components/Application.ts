import { Page } from '@playwright/test'
import { InboxDeckPage } from './decks/inbox/InboxDeckPage'
import { LibraryPage } from './library/LibraryPage'
import { TabsBar } from './TabsBar'

export class Application {
  constructor(public readonly page: Page) { }

  get library() {
    return new LibraryPage(this.page)
  }

  get inboxDeck() {
    return new InboxDeckPage(this.page)
  }

  get tabsBar() {
    return new TabsBar(this.page, this.page.getByTestId("tabs-bar"))
  }
}
