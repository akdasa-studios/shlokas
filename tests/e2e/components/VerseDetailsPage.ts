import { Page } from '@playwright/test'

export class VerseDetailsPage {
  constructor(private readonly page: Page) {}

  get addButton() {
    return this.page.getByRole('button', { name: 'Add' })
  }

  get backButton() {
    return this.page.getByRole('button', { name: 'back' })
  }
}