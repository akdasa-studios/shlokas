import { test, expect } from '@playwright/test'
import { testId } from '@/app/TestId'
import { Application } from '$/e2e/components'

let app: Application

test.beforeEach(async ({ page }) => {
  app = new Application(page)
  await app.library.open()
  await app.tabsBar.settingsTab.click()
})

test.describe('Settings › Language', () => {
  test('Change language', async () => {
    await app.settings.changeLanguage("Русский")
    const header = await app.page.getByRole("banner").textContent()
    expect(header).toEqual("Настройки")
  })

  test('Saves settings', async () => {
    await app.settings.changeLanguage("Русский")
    await app.page.reload()

    const header = await app.page.getByRole("banner").textContent()
    expect(header).toEqual("Настройки")
  })
})