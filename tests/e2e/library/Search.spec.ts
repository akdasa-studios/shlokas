import { test, expect } from '@playwright/test'
import { testId } from '@/app/TestId'
import { Application } from './pages/Application'

let app: Application

test.beforeEach(async ({ page }) => {
  app = new Application(page)
  await app.library.open()
})

test.describe('Search', () => {
  test('By verse number', async () => {
    await app.library.searchbar.search('BG 1.1')
    const count = await app.library.versesList.count()
    expect(count).toEqual(1)
  })

  test('By text', async () => {
    await app.library.searchbar.search('army')
    const item = await app.library.versesList.getByTestId(testId('BG 9.2'))

    const isItemVisible = await item.isVisible()
    const itemsCount = await app.library.versesList.count()

    expect(isItemVisible).toBeTruthy()
    expect(itemsCount).toEqual(1)
  })

  test('Nothing found', async () => {
    await app.library.searchbar.search('NOTHING FOUND')
    const itemsCount = await app.library.versesList.count()
    expect(itemsCount).toEqual(0)
  })

  test('Respect diacritics', async () => {
    await app.library.searchbar.search('Dhṛtarāṣṭra')
    const itemsCount = await app.library.versesList.count()
    expect(itemsCount).toEqual(1)
  })

  test('Search by verse', async () => {
    await app.library.searchbar.search('kim akurvata')
    const itemsCount = await app.library.versesList.count()
    expect(itemsCount).toEqual(1)
  })

  // todo: fix, it should not be case sensetive
  test('Respect case', async () => {
    await app.library.searchbar.search('bg 1.1')
    const itemsCount = await app.library.versesList.count()
    expect(itemsCount).toEqual(0) // todo: should be 1
  })

  // todo: fix
  test('Ignores diacritics', async () => {
    await app.library.searchbar.search('Dhrtarastra')
    const itemsCount = await app.library.versesList.count()
    expect(itemsCount).toEqual(0)
  })
})