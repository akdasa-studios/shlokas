import { Page } from '@playwright/test'
import { testId } from '@/app/TestId'
import { Card } from '../Card'
import { Component } from '../../core/Component'

export class ReviewDeckPage {
  public readonly empty: Component

  constructor(
    private readonly page: Page,
  ) {
    this.empty = new Component(page, page.getByTestId("reviewEmpty"))
  }

  getCard(verseNumber: string, type: string) {
    const cardId = testId(verseNumber ,'card', type.toString())
    return new Card(this.page, this.page.getByTestId(cardId))
  }
}
