import { Locator, Page } from "@playwright/test"
import { Component } from "./components/Component"

export class Card extends Component {
  constructor(page: Page, locator: Locator) {
    super(page, locator)
  }

  async index() {
    return parseInt(await this.locator.getAttribute("data-index") || "-1")
  }

  async swipe(direction: "left" | "right" | "top" | "bottom") {
    await this.waitFor("visible")

    const cardBoundingBox = await this.locator.boundingBox()
    const dx = direction === "left" ? -40 : direction === "right" ? 120 : 0
    const dy = direction === "top" ? -60 : direction === "bottom" ? 120 : 0

    const sourcePosition = {
      x: cardBoundingBox?.x as number + 40,
      y: cardBoundingBox?.y as number + 80
    }
    const targetPosition = {
      x: sourcePosition.x + dx,
      y: sourcePosition.y + dy
    }

    await this.locator.dragTo(this.locator, {
      sourcePosition, targetPosition
    })
    await this.page.waitForTimeout(500)
  }

}