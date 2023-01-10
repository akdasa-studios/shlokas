import { InboxCardType } from '@akdasa-studios/shlokas-core'
import { expect, Locator, Page } from '@playwright/test'
import { testId } from '@/app/TestId'
import { Component } from './components/Component'
import { Card } from './Card'

export class InboxDeckPage {
  public readonly empty: Component

  constructor(
    private readonly page: Page,
  ) {
    this.empty = new Component(page, page.getByTestId("inboxEmpty"))
  }

  getCard(verseNumber: string, type: string) {
    const cardId = testId(verseNumber ,'card', type.toString())
    return new Card(this.page, this.page.getByTestId(cardId))
  }
}
