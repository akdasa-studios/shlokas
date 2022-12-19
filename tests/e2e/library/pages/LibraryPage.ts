import { expect, Locator, Page } from '@playwright/test';
import { LibraryModalDialog } from './LibraryModalDialog';

export class LibraryPage {
  constructor(public readonly page: Page) { }
  async open() {
    await this.page.goto('/home/library');
  }

  async search(query: string): Promise<Locator> {
    const searchbar = this.page.getByTestId("searchbar")
    await searchbar.click()
    await searchbar.type(query)
    await searchbar.press("Enter")
    await this.page.waitForTimeout(1000)
    return await this.page.getByRole('listitem')
  }

  async openVerse(number: string): Promise<LibraryModalDialog> {
    const firstVerse = await this.page.getByTestId(number).first();
    await firstVerse.click();

    const verseDialog = await this.page.getByRole("dialog").first();
    await verseDialog.waitFor({ state: "visible" });
    await expect(verseDialog).toBeVisible();

    return new LibraryModalDialog(verseDialog);
  }


  async expectStatusBadgeOfVerseToBe(verseNumber: string, value: string | undefined) {
    const badge = await this.page.getByTestId(verseNumber + " badge")
    if (!value) {
      await badge.waitFor({state:"detached"})
      expect(await badge.isVisible()).toBeFalsy()
    } else {
      expect(await badge.textContent()).toEqual(value)
    }
  }
}
