import { test, expect } from '@playwright/test'
import { Application, LibraryPage } from '../components'


test.describe('Library › Search › Change language', () => {
  let library: LibraryPage

  /* -------------------------------------------------------------------------- */
  /*                                    Hooks                                   */
  /* -------------------------------------------------------------------------- */

  test.beforeEach(async ({ page }) => {
    library = new LibraryPage(page)

    await new Application(page).goto('/home/library')

    await page.getByTestId('settings-tab').click()
    await page.getByTestId('language').click()
    await page.getByRole('button', { name: 'Русский' }).click()
    await page.getByTestId('library-tab').click()
  })

  test.afterEach(async ({ page }) => {
    page.close()
  })


  /* -------------------------------------------------------------------------- */
  /*                                    Tests                                   */
  /* -------------------------------------------------------------------------- */

  test('Library updated to selected language', async () => {
    await expect(library.verse('бг 1.1')).toBeVisible()
  })

  test('Search by text foreign language', async ({ page }) => {
    await page.getByPlaceholder('Поиск').fill('Панду')

    await expect(library.listItems).toHaveCount(1)
    await expect(library.verse('бг 1.1')).toBeVisible()
  })
})
