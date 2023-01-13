import { ReviewCardType , InboxCardType } from '@akdasa-studios/shlokas-core'
import { expect, test } from '@playwright/test'
import { ApplicationPage } from '$/e2e/components'


let app: ApplicationPage

test.beforeEach(async ({ page }) => {
  app = new ApplicationPage(page)
  await app.library.open()
})

test.describe('Review Deck', () => {

  test('Deck is empty', async () => {
    await app.tabsBar.reviewTab.click()
    await app.reviewDeck.empty.waitFor("visible")
    const visible = await app.reviewDeck.empty.isVisible()
    expect(visible).toBeTruthy()
  })


  test.describe('Swipe Cards', () => {

    test.beforeEach(async () => {
      const versesToAdd = ['BG 1.1', 'BG 2.13']
      for (const v of versesToAdd) {
        await app.library.openVerse(v)
        await app.library.verseDialog.addVerse.click()
        await app.library.verseDialog.waitFor('hidden')
      }

      await app.tabsBar.inboxTab.click()
      for (const v of versesToAdd) {
        const card1 = app.inboxDeck.getCard(v, InboxCardType.Translation)
        await card1.swipe("top")
        const card2 = app.inboxDeck.getCard(v, InboxCardType.Text)
        await card2.swipe("top")
      }
      await app.tabsBar.reviewTab.click()
    })

    test('Deck is not empty', async () => {
      await app.tabsBar.reviewTab.click()
      await app.reviewDeck.empty.waitFor("hidden")
      const visible = await app.reviewDeck.empty.isVisible()
      expect(visible).toBeFalsy()
    })

    test('Swipe card right', async () => {
      const card = app.reviewDeck.getCard('BG 1.1', ReviewCardType.NumberToTranslation)
      await card.swipe("right")

      const inboxBagde = await app.tabsBar.reviewTab.badge.textContent()
      expect(inboxBagde).toEqual("1")
    })
  })
})