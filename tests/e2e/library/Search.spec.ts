import { test, expect } from '@playwright/test'
import { Application, LibraryPage } from '../components'


test.describe('Library › Search', () => {
  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  let library: LibraryPage

  /* -------------------------------------------------------------------------- */
  /*                                    Hooks                                   */
  /* -------------------------------------------------------------------------- */

  test.beforeEach(async ({ page }) => {
    library = new LibraryPage(page)
    await new Application(page).goto('/home/library', {
      tutorialEnabled: false,
      libraryLastSyncDate: 9999999999999
    })
  })

  test.afterEach(async ({ page }) => {
    page.close()
  })


  /* -------------------------------------------------------------------------- */
  /*                                    Tests                                   */
  /* -------------------------------------------------------------------------- */

  test('By verse number', async () => {
    await library.searchbar.fill('BG 1.1')
    await expect(library.listItems).toHaveCount(1)
  })

  test('By text', async () => {
    await library.searchbar.fill('embodied')
    await expect(library.listItems).toHaveCount(1)
    await expect(library.verse('bg 2.13')).toBeVisible()
  })

  test('By verse', async () => {
    await library.searchbar.fill('kim akurvata')
    await expect(library.listItems).toHaveCount(1)
    await expect(library.verse('bg 1.1')).toBeVisible()
  })

  test('Nothing found', async () => {
    await library.searchbar.fill('<NOTHING FOUND>')
    await expect(library.listItems).toHaveCount(0)
    await expect(library.verse('bg 1.1')).toBeHidden()
  })

  test('Respects diacritics', async () => {
    await library.searchbar.fill('Dhṛtarāṣṭra')
    await expect(library.listItems).toHaveCount(1)
    await expect(library.verse('bg 1.1')).toBeVisible()
  })

  test('Ignores case', async () => {
    await library.searchbar.fill('bg 1.1')
    await expect(library.listItems).toHaveCount(1)
    await expect(library.verse('bg 1.1')).toBeVisible()
  })

  test('Ignores diacritics', async () => {
    await library.searchbar.fill('Dhrtarastra')
    await expect(library.listItems).toHaveCount(1)
    await expect(library.verse('bg 1.1')).toBeVisible()
  })
})