import { InboxCardType } from '@akdasa-studios/shlokas-core'
import { expect, test } from '@playwright/test'
import { testId } from '@/app/TestId'



test.describe('Review Deck', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/home/library?tutorialEnabled=false')
  })

  test('Deck is empty', async ({ page }) => {
    await page.getByTestId('review-tab').click()
    await expect(page.getByTestId("reviewEmpty")).toBeVisible()
  })


  test.describe('Swipe Cards', () => {

    test.beforeEach(async ({ page }) => {
      const versesToAdd = ['BG 1.1', 'BG 2.13']
      for (const v of versesToAdd) {
        await page.getByRole('heading', { name: v }).click()
        await page.getByRole('button', { name: 'Add' }).click()
      }

      await page.getByTestId('inbox-tab').click()
      for (const v of versesToAdd) {
        for (const t of [InboxCardType.Translation, InboxCardType.Text]) {
          const cardLocator = page.getByTestId(testId(v, 'card', t))
          await cardLocator.dragTo(cardLocator, {
            sourcePosition: { x: 40, y: 60 },
            targetPosition: { x: 40, y: 0 }
          })
        }
      }

      await page.getByTestId('review-tab').click()
      await page.waitForTimeout(200) // firefox, webkit
    })


    test('Deck is not empty', async ({ page }) => {
      await page.getByTestId('review-tab').click()
      await expect(page.getByTestId("reviewEmpty")).toBeHidden()
    })

    test('Swipe card right', async ({ page }) => {
      const cardLocator = page.getByTestId("bg 1.1-card-numbertotranslation")
      await cardLocator.dragTo(cardLocator, {
        sourcePosition: { x: 60, y: 60 },
        targetPosition: { x: 0,  y: 60 }
      })
      await expect(page.getByTestId('review-tab-badge')).toContainText("1")
    })
  })
})