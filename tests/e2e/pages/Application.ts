import { Page } from '@playwright/test'
import { InboxDeckPage } from './InboxDeckPage'
import { LibraryPage } from './LibraryPage'
import { TabsBar } from './TabsBar'
import { Toasts } from './Toasts'

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

  get toasts() {
    return new Toasts(this.page)
  }
}
