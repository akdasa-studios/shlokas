import { Page } from '@playwright/test'
import { List, Searchbar, Toast } from '$/e2e/components/core'
import { testId } from '@/app/TestId'
import { VerseDialog } from './VerseDialog'
import { VerseListItem } from './VerseListItem'


export class LibraryPage {
  public readonly searchbar: Searchbar
  public readonly versesList: List<VerseListItem>
  public readonly verseAddedToast: Toast
  public readonly verseDialog: VerseDialog

  constructor(public readonly page: Page) {
    this.searchbar = new Searchbar(page, page.getByTestId('searchbar'))
    this.versesList = new List(page, page.getByRole('list'), VerseListItem)
    this.verseAddedToast = new Toast(page, page.getByText('added to inbox'))
    this.verseDialog = new VerseDialog(page, this.page.getByRole("dialog").first())
  }

  async open() {
    await this.page.goto('/home/library')
  }

  async openVerse(number: string) {
    const listItem = await this.versesList.getByTestId(testId(number))
    await listItem.click()
  }
}
