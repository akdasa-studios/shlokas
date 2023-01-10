import { Page } from '@playwright/test'
import { testId } from '@/app/TestId'
import { Searchbar, Toast, List } from './components'
import { LibraryModalDialog } from './LibraryModalDialog'
import { VerseListItem } from './VerseListItem'

export class LibraryPage {
  public readonly searchbar: Searchbar
  public readonly versesList: List<VerseListItem>
  public readonly verseAddedToast: Toast
  public readonly verseDialog: LibraryModalDialog

  constructor(public readonly page: Page) {
    this.searchbar = new Searchbar(page, page.getByTestId('searchbar'))
    this.versesList = new List(page, page.getByRole('list'), VerseListItem)
    this.verseAddedToast = new Toast(page, page.getByText('added to inbox'))
    this.verseDialog = new LibraryModalDialog(page, this.page.getByRole("dialog").first())
  }

  async open() {
    await this.page.goto('/home/library')
  }

  async openVerse(number: string) {
    const listItem = await this.versesList.getByTestId(testId(number))
    await listItem.click()
  }
}
