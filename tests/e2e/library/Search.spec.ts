import { test, expect } from '@playwright/test'
import { Application, LibraryPage } from '../components'


test.beforeEach(async ({ page }) => {
    await new Application(page)
      .goto("/home/library", { tutorialEnabled: false })
})

test.describe('Library › Search', () => {
  test('By verse number', async ({ page }) => {
    const library = new LibraryPage(page)
    await library.searchbar.fill('BG 1.1')
    await expect(library.listItems).toHaveCount(1)
  })

  test('By text', async ({ page }) => {
    const library = new LibraryPage(page)
    await library.searchbar.fill('army')
    await expect(library.listItems).toHaveCount(1)
    await expect(page.getByTestId('bg 9.2')).toBeVisible()
  })

  test('By verse', async ({ page }) => {
    const library = new LibraryPage(page)
    await library.searchbar.fill('kim akurvata')
    await expect(library.listItems).toHaveCount(1)
    await expect(library.verse('bg 1.1')).toBeVisible()
  })

  test('Nothing found', async ({ page }) => {
    const library = new LibraryPage(page)
    await library.searchbar.fill('<NOTHING FOUND>')
    await expect(library.listItems).toHaveCount(0)
    await expect(library.verse('bg 1.1')).toBeHidden()
  })

  test('Respects diacritics', async ({ page }) => {
    const library = new LibraryPage(page)
    await library.searchbar.fill('Dhṛtarāṣṭra')
    await expect(library.listItems).toHaveCount(1)
    await expect(library.verse('bg 1.1')).toBeVisible()
  })

  test('Ignores case', async ({ page }) => {
    const library = new LibraryPage(page)
    await library.searchbar.fill('bg 1.1')
    await expect(library.listItems).toHaveCount(1)
    await expect(library.verse('bg 1.1')).toBeVisible()
  })

  test('Ignores diacritics', async ({ page }) => {
    const library = new LibraryPage(page)
    await library.searchbar.fill('Dhrtarastra')
    await expect(library.listItems).toHaveCount(1)
    await expect(library.verse('bg 1.1')).toBeVisible()
  })

  test.describe('Change language', () => {
    test.beforeEach(async ({ page }) => {
      await page.getByTestId('settings-tab').click()
      await page.getByTestId('language').click()
      await page.getByRole('button', { name: 'Русский' }).click()
      await page.getByTestId('library-tab').click()
    })

    test('Library updated', async ({ page }) => {
      await expect(page.getByTestId('бг 1.1')).toBeVisible()
    })

    test('Search by text', async ({ page }) => {
      const library = new LibraryPage(page)
      await page.getByPlaceholder('Поиск').fill('будет изобилие')

      // expect:
      await expect(library.listItems).toHaveCount(1)
      await expect(page.getByTestId('бг 18.78')).toBeVisible()
    })
  })
})