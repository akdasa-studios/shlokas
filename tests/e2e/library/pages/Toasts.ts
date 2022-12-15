import { Page } from '@playwright/test';

export class Toasts {
  constructor(public readonly page: Page) { }

  async waitForToastWithText(text: string) {
    const toast = await this.page.getByText(text).first();
    await toast.waitFor({ state: "visible", timeout: 1000 });
  }

  async clickRevertOnToast() {
    const toast = await this.page.getByText('Revert').first();
    await toast.waitFor({ state: "visible", timeout: 1000 });
    await toast.click();
  }
}
