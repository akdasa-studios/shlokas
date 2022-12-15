import { expect, Page } from '@playwright/test';
import { LibraryModalDialog } from './LibraryModalDialog';

export class LibraryPage {
  constructor(public readonly page: Page) { }
  async open() {
    await this.page.goto('/home/library');
  }

  async openVerse(number: string): Promise<LibraryModalDialog> {
    const firstVerse = await this.page.getByText(number).first();
    await firstVerse.click();

    const verseDialog = await this.page.getByTestId("verseViewDialog").first();
    await verseDialog.waitFor({ state: "visible" });
    await expect(verseDialog).toBeVisible();

    return new LibraryModalDialog(verseDialog);
  }
}
