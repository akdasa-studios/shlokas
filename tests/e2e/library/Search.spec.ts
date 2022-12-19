import { test, expect } from '@playwright/test';
import { Application } from './pages/Application';

let app: Application

test.beforeEach(async ({ page }) => {
  app = new Application(page)
  await app.library.open()
})

test.describe('Search', () => {
  test('By verse number', async () => {
    const items = await app.library.search('BG 1.1')
    expect(await items.count()).toEqual(1)
  })

  test('By text', async () => {
    const items = await app.library.search('army')
    expect(await app.page.getByTestId('BG 1.2').count()).toEqual(1)
    expect(await items.count()).toEqual(1)
  })

  test('Nothing found', async () => {
    const items = await app.library.search('NOTHING FOUND')
    expect(await items.count()).toEqual(0)
  })
})