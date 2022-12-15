import { Locator } from '@playwright/test';

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
}
