import { Page } from '@playwright/test'
import { LibraryPage } from './LibraryPage'
import { TabsBar } from './TabsBar'
import { Toasts } from './Toasts'

export class Application {
  constructor(public readonly page: Page) { }

  get library() {
    return new LibraryPage(this.page)
  }

  get tabsBar() {
    return new TabsBar(this.page)
  }

  get toasts() {
    return new Toasts(this.page)
  }
}
