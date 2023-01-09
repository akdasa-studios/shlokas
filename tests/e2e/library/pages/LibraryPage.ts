import { expect, Page } from '@playwright/test'
import { testId } from '@/app/TestId'
import { Searchbar } from './components'
import { List } from './components/List'
import { LibraryModalDialog } from './LibraryModalDialog'

export class LibraryPage {
  public readonly searchbar: Searchbar
  public readonly versesList: List

  constructor(public readonly page: Page) {
    this.searchbar = new Searchbar(page, page.getByTestId('searchbar'))
    this.versesList = new List(page, page.getByRole('list'))
  }

  async open() {
    await this.page.goto('/home/library')
  }

  async openVerse(number: string): Promise<LibraryModalDialog> {
    const listItem = await this.versesList.getByTestId(testId(number))
    await listItem.click()

    const verseDialog = await this.page.getByRole("dialog").first()
    await verseDialog.waitFor({ state: "visible" })
    await expect(verseDialog).toBeVisible()

    return new LibraryModalDialog(verseDialog)
  }


  async expectStatusBadgeOfVerseToBe(verseNumber: string, value: string | undefined) {
    const badge = await this.page.getByTestId(testId(verseNumber, "badge"))
    if (!value) {
      await badge.waitFor({ state: "detached" })
      expect(await badge.isVisible()).toBeFalsy()
    } else {
      expect(await badge.textContent()).toEqual(value)
    }
  }
}
