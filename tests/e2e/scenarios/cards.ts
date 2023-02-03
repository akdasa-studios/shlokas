import { InboxCardType } from "@akdasa-studios/shlokas-core"
import { Page } from "@playwright/test"
import { testId } from "@/app/TestId"
import { InboxDeckPage, LibraryPage, TabsBar } from "../components"

export async function addCardsToReview(page: Page, verses: string[]) {
  const library = new LibraryPage(page)
  const inbox = new InboxDeckPage(page)
  const tabs = new TabsBar(page)

  // add verses to inbox
  for (const verse of verses) {
    await library.verse(verse).click()
    await library.addVerseButton.click()
  }

  await tabs.inboxTab.click()

  // memorize cards form inbox
  for (const verse of verses) {
    for (const t of [InboxCardType.Translation, InboxCardType.Text]) {
      const cardLocator = page.getByTestId(testId(verse, 'card', t))
      await inbox.swipeCardTop(cardLocator)
      await cardLocator.waitFor({ state: 'detached' })
    }
  }

  // eslint-disable-next-line playwright/no-wait-for-timeout
  await page.waitForTimeout(250) // give time to save
}