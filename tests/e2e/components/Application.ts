import { Page } from '@playwright/test'

export interface ApplicationParams {
  tutorialEnabled?: boolean,
  date?: Date
}

export class Application {
  constructor(private readonly page: Page) {
  }

  async goto(url: string, params: ApplicationParams) {
    // @ts-ignore
    const queryString = new URLSearchParams(params).toString()
    await this.page.goto(`${url}?${queryString}`)
  }
}