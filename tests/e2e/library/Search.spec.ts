import { test, expect } from '@playwright/test'
import { testId } from '@/app/TestId'
import { Application } from '$/e2e/components'

let app: Application

test.beforeEach(async ({ page }) => {
  app = new Application(page)
  await app.library.open()
})

test.describe('Library › Search', () => {
  test('By verse number', async () => {
    await app.library.searchbar.search('BG 1.1')
    const count = await app.library.versesList.count()

    expect(count).toEqual(1)
  })

  test('By text', async () => {
    await app.library.searchbar.search('army')
    const item = await app.library.versesList.getByTestId(testId('BG 9.2'))

    const isVisible  = await item.isVisible()
    const itemsCount = await app.library.versesList.count()

    expect(isVisible).toBeTruthy()
    expect(itemsCount).toEqual(1)
  })

  test('By verse', async () => {
    await app.library.searchbar.search('kim akurvata')
    const itemsCount = await app.library.versesList.count()
    expect(itemsCount).toEqual(1)
  })

  test('Nothing found', async () => {
    await app.library.searchbar.search('NOTHING FOUND')
    const itemsCount = await app.library.versesList.count()
    expect(itemsCount).toEqual(0)
  })

  test('Respects diacritics', async () => {
    await app.library.searchbar.search('Dhṛtarāṣṭra')
    const itemsCount = await app.library.versesList.count()
    expect(itemsCount).toEqual(1)
  })

  test('Change language', async () => {
    await app.tabsBar.settingsTab.click()
    await app.settings.changeLanguage("Русский")
    await app.tabsBar.libraryTab.click()
    await app.page.waitForTimeout(1000)

    const item = await app.library.versesList.getByTestId("бг 1.1")
    const visible = await item.isVisible()

    expect(visible).toBeTruthy()
  })

  // todo: fix, it should not be case sensetive
  test.fixme('Respect case', async () => {
    await app.library.searchbar.search('bg 1.1')
    const itemsCount = await app.library.versesList.count()
    expect(itemsCount).toEqual(1) // todo: should be 1
  })

  // todo: fix
  test.fixme('Ignores diacritics', async () => {
    await app.library.searchbar.search('Dhrtarastra')
    const itemsCount = await app.library.versesList.count()
    expect(itemsCount).toEqual(1)
  })
})