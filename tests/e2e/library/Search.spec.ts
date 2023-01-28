import { test, expect } from '@playwright/test'
import { testId } from '@/app/TestId'
import { ApplicationPage } from '$/e2e/components'

let app: ApplicationPage

test.beforeEach(async ({ page }) => {
  app = new ApplicationPage(page)
  await app.library.open()
})

test.describe('Library › Search', () => {
  test('By verse number', async ({ page }) => {
    await page.getByPlaceholder('Search').fill('BG 1.1')
    await expect(page.getByRole('listitem')).toHaveCount(1)
  })

  test('By text', async ({ page }) => {
    await page.getByPlaceholder('Search').fill('army')
    await expect(page.getByRole('listitem')).toHaveCount(1)
    await expect(page.getByTestId('bg 9.2')).toBeVisible()
  })

  test('By verse', async ({ page }) => {
    await page.getByPlaceholder('Search').fill('kim akurvata')
    await expect(page.getByRole('listitem')).toHaveCount(1)
    await expect(page.getByTestId('bg 1.1')).toBeVisible()
  })

  test('Nothing found', async ({ page }) => {
    await page.getByPlaceholder('Search').fill('<NOTHING FOUND>')
    await expect(page.getByRole('listitem')).toHaveCount(0)
    await expect(page.getByTestId('bg 1.1')).toBeHidden()
  })

  test('Respects diacritics', async ({ page }) => {
    await page.getByPlaceholder('Search').fill('Dhṛtarāṣṭra')
    await expect(page.getByRole('listitem')).toHaveCount(1)
    await expect(page.getByTestId('bg 1.1')).toBeVisible()
  })

  test('Ignores case', async ({ page }) => {
    await page.getByPlaceholder('Search').fill('bg 1.1')
    await expect(page.getByRole('listitem')).toHaveCount(1)
    await expect(page.getByTestId('bg 1.1')).toBeVisible()
  })

  test('Ignores diacritics', async ({ page }) => {
    await app.library.searchbar.search('Dhrtarastra')
    await expect(page.getByRole('listitem')).toHaveCount(1)
    await expect(page.getByTestId('bg 1.1')).toBeVisible()
  })

  test.describe('Change language', () => {
    test.beforeEach(async () => {
      await app.tabsBar.settingsTab.click()
      await app.settings.changeLanguage("Русский")
      await app.tabsBar.libraryTab.click()
      await app.page.waitForTimeout(1000)
    })

    test('Library updated', async ({ page }) => {
      await expect(page.getByTestId('бг 1.1')).toBeVisible()
    })

    test('Search by text', async ({ page }) => {
      await page.getByPlaceholder('Поиск').fill('будет изобилие')
      await expect(page.getByRole('listitem')).toHaveCount(1)
      await expect(page.getByTestId('бг 18.78')).toBeVisible()
    })
  })
})