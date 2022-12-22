import { testId } from '@/app/TestId'
import { InboxCardType } from '@akdasa-studios/shlokas-core'
import { expect, Page } from '@playwright/test'

export class InboxDeckPage {
  constructor(public readonly page: Page) { }
  async open() {
    await this.page.getByTestId("inbox-tab").click()
  }

  async swipeCard(
    verseNumber: string,
    type: InboxCardType,
    direction: "left" | "right" | "top" | "bottom"
  ) {
    const card = await this.page.getByTestId(
      testId(verseNumber ,'card', type.toString())
    )
    const cardBoundingBox = await card.boundingBox()
    const dx = direction === "left" ? -40 : direction === "right" ? 120 : 0
    const dy = direction === "top" ? -60 : direction === "bottom" ? 120 : 0


    const sourcePosition = {
      x: cardBoundingBox?.x as number,
      y: cardBoundingBox?.y as number
    }
    const targetPosition = {
      x: sourcePosition.x + dx,
      y: sourcePosition.y + dy
    }

    await card.dragTo(card, {
      sourcePosition, targetPosition
    })
    await this.page.waitForTimeout(500)
  }

  async expectCardIndex(
    verseNumber: string,
    type: InboxCardType,
    index: number
  ) {
    const card = await this.page.getByTestId(
      testId(verseNumber ,'card', type.toString())
    )
    const actualIndex = await card.getAttribute("data-index")
    expect(actualIndex).toEqual(index.toString())
  }
}
