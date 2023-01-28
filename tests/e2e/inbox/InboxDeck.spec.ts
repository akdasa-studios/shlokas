import { InboxCardType } from '@akdasa-studios/shlokas-core'
import { expect, test } from '@playwright/test'


test.describe('Inbox Deck', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/home/library?tutorialEnabled=false')
  })

  test('Inbox is empty', async ({ page }) => {
    await page.getByTestId('inbox-tab').click()
    await expect(page.getByTestId("inboxEmpty")).toBeVisible()
  })


  test.describe('Swipe Cards', () => {

    test.beforeEach(async ({ page }) => {
      await page.getByRole('heading', { name: 'BG 1.1' }).click()
      await page.getByRole('button', { name: 'Add' }).click()
      await page.getByTestId('inbox-tab').click()
    })

    test('Swipe card right', async ({ page }) => {
      const cardLocator = page.getByTestId("bg 1.1-card-translation")
      await cardLocator.dragTo(cardLocator, {
        sourcePosition: { x: 40, y: 60 },
        targetPosition: { x: 0,  y: 60 }
      })

      await expect(cardLocator).toHaveAttribute("data-index", "1")
      await expect(page.getByTestId('inbox-tab-badge')).toContainText("2")
    })

    test('Swipe card top', async ({ page }) => {
      const cardLocator = page.getByTestId("bg 1.1-card-translation")
      await cardLocator.dragTo(cardLocator, {
        sourcePosition: { x: 0, y: 60 },
        targetPosition: { x: 0, y: 0 }
      })

      await expect(page.getByTestId('inbox-tab-badge')).toContainText("1")
    })

    test('Review badge', async ({ page }) => {
      const cardLocator = page.getByTestId("bg 1.1-card-translation")
      await cardLocator.dragTo(cardLocator, {
        sourcePosition: { x: 0, y: 60 },
        targetPosition: { x: 0, y: 0 }
      })
      await page.getByTestId('library-tab').click()
      await expect(page.getByTestId('bg 1.1-badge')).toHaveText("REVIEW")
    })

    test('Swipe all cards', async ({ page }) => {
      const cardTypesToSwipe = [
        InboxCardType.Translation,
        InboxCardType.Text,
      ]

      for (const cardTypeToSwipe of cardTypesToSwipe) {
        const cardLocator = page.getByTestId("bg 1.1-card-" + cardTypeToSwipe.toLowerCase())
        await cardLocator.dragTo(cardLocator, {
          sourcePosition: { x: 0, y: 60 },
          targetPosition: { x: 0, y: 0 }
        })
      }

      await expect(page.getByTestId("inboxEmpty")).toBeVisible()
      await expect(page.getByTestId('inbox-tab-badge')).toBeHidden()
      await expect(page.getByTestId('review-tab-badge')).toHaveText("1")
    })
  })
})