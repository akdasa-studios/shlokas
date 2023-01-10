import { InboxCardType } from '@akdasa-studios/shlokas-core'
import { expect, test } from '@playwright/test'
import { Application } from '$/e2e/components'


let app: Application

test.beforeEach(async ({ page }) => {
  app = new Application(page)
  await app.library.open()
})

test.describe('Inbox Deck', () => {

  test('Inbox is empty', async () => {
    await app.tabsBar.inboxTab.click()
    await app.inboxDeck.empty.waitFor("visible")
    const visible = await app.inboxDeck.empty.isVisible()
    expect(visible).toBeTruthy()
  })


  test.describe('Swipe Cards', () => {

    test.beforeEach(async () => {
      await app.library.openVerse('BG 1.1')
      await app.library.verseDialog.addVerse.click()
      await app.tabsBar.inboxTab.click()
    })

    test('Swipe card right', async () => {
      const card = app.inboxDeck.getCard('BG 1.1', InboxCardType.Translation)
      await card.swipe("right")

      const index      = await card.index()
      const inboxBagde = await app.tabsBar.inboxTab.badge.textContent()
      expect(inboxBagde).toEqual("2")
      expect(index).toEqual(1)
    })

    test('Swipe card top', async () => {
      const card = app.inboxDeck.getCard('BG 1.1', InboxCardType.Translation)
      await card.swipe("top")
      const inboxBagde = await app.tabsBar.inboxTab.badge.textContent()
      expect(inboxBagde).toEqual("1")
    })

    test('Swipe all cards', async () => {
      const cardTypesToSwipe = [
        InboxCardType.Translation,
        InboxCardType.Text,
      ]

      for (const cardTypeToSwipe of cardTypesToSwipe) {
        const card = app.inboxDeck.getCard('BG 1.1', cardTypeToSwipe)
        await card.swipe("top")
      }

      const visible     = await app.inboxDeck.empty.isVisible()
      const inboxBagde  = await app.tabsBar.inboxTab.badge.isVisible()
      const beviewBagde = await app.tabsBar.reviewTab.badge.textContent()
      expect(visible).toBeTruthy()
      expect(inboxBagde).toBeFalsy()
      expect(beviewBagde).toEqual("1")
    })
  })
})