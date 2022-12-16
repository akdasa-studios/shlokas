import { Locator, expect } from '@playwright/test';

export class LibraryModalDialog {
  constructor(public readonly locator: Locator) { }

  async close() {
    const closeButton = await this.locator.page().getByTestId("closeVerseDialog").first();
    await closeButton.click();
    await this.locator.waitFor({ state: "detached" });
  }

  async addVerse() {
    const addVerseToInbox = await this.locator.page().getByTestId("addVerseToInbox").first();
    await addVerseToInbox.click();
  }

  async expectAddButtonIsHidden() {
    const addButton = await this.locator.page().getByTestId("addVerseToInbox").first()
    await expect(addButton).toBeHidden()
  }
}
