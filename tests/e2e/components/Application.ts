import { Page } from '@playwright/test'
import { InboxDeckPage } from './decks/inbox/InboxDeckPage'
import { ReviewDeckPage } from './decks/review/ReviewDeckPage'
import { LibraryPage } from './library/LibraryPage'
import { SettingsPage } from './settings/SettingsPage'
import { TabsBar } from './TabsBar'

export class ApplicationPage {
  constructor(public readonly page: Page) { }

  get library() {
    return new LibraryPage(this.page)
  }

  get inboxDeck() {
    return new InboxDeckPage(this.page)
  }

  get reviewDeck() {
    return new ReviewDeckPage(this.page)
  }

  get settings() {
    return new SettingsPage(this.page)
  }

  get tabsBar() {
    return new TabsBar(this.page, this.page.getByTestId("tabs-bar"))
  }
}
