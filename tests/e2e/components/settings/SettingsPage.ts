import { Page } from '@playwright/test'
import { Component } from '$/e2e/components/core'


export class SettingsPage {
  public readonly language: Component

  constructor(public readonly page: Page) {
    this.language = new Component(page, page.getByTestId('language'))
  }

  async changeLanguage(lang: string) {
    await this.language.click()
    await this.page.locator("ion-action-sheet").getByText(lang).click()
    await this.page.locator("ion-action-sheet").waitFor({ state: "hidden"})
  }
}
