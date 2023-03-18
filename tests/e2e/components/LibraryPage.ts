import { Page } from '@playwright/test'
import { testId } from '@/app/TestId'

export class LibraryPage {
  constructor(private readonly page: Page) {}

  get searchbar() {
    return this.page.getByPlaceholder('Search')
  }

  get listItems() {
    return this.page.getByRole('listitem')
  }

  verse(title: string) {
    return this.page.getByRole('heading', { name: title })
  }

  verseBadge(number: string) {
    return this.page.getByTestId(testId(number, 'badge'))
  }
}