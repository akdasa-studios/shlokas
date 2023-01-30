import { Page } from "@playwright/test"
import { testId } from "@/app/TestId"

export class LibraryPage {
  constructor(private readonly page: Page) {}

  verse(title: string) { return this.page.getByRole('heading', { name: title }) }
  verseBadge(number: string) { return this.page.getByTestId(testId(number, "badge")) }
  verseAddedBadge(number: string) { return this.page.getByText(`Verse ${number} added to inbox`)}

  get revertButton() { return this.page.getByRole('button', { name: 'Revert' }) }

  get addVerseButton() { return this.page.getByRole('button', { name: 'Add' }) }
  get closeVerseDialog() { return this.page.getByRole('button', { name: 'close' }) }
}