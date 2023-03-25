import { InboxCardType } from '@akdasa-studios/shlokas-core'
import { Page } from '@playwright/test'
import { testId } from '@/app/TestId'
import { InboxDeckPage, LibraryPage, TabsBar, VerseDetailsPage } from '../components'

export async function addCardsToReview(page: Page, verses: string[]) {
  const library = new LibraryPage(page)
  const verseDetailsPage = new VerseDetailsPage(page)
  const inbox = new InboxDeckPage(page)
  const tabs = new TabsBar(page)

  // add verses to inbox
  for (const verse of verses) {
    await library.verse(verse).click()
    await verseDetailsPage.addButton.click()
    await verseDetailsPage.addButton.waitFor({ state: 'detached' })
  }

  await tabs.inboxTab.click()

  // memorize cards form inbox
  for (const verse of verses) {
    for (const t of [InboxCardType.Translation, InboxCardType.Text]) {
      const cardLocator = page.getByTestId(testId(verse, 'card', t))
      await inbox.swipeCardUp(cardLocator)
      await cardLocator.waitFor({ state: 'detached' })
    }
  }

  // eslint-disable-next-line playwright/no-wait-for-timeout
  await page.waitForTimeout(250) // give time to save
}



export async function addCardsToInbox(page: Page, verses: string[]) {
  const library = new LibraryPage(page)
  const verseDetailsPage = new VerseDetailsPage(page)

  // add verses to inbox
  for (const verse of verses) {
    await library.verse(verse).click()
    await verseDetailsPage.addButton.click()
  }
}

