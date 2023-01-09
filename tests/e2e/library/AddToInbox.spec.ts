import fs from 'fs'
import { test } from '@playwright/test'
import v8toIstanbul  from 'v8-to-istanbul'
import { Application } from './pages/Application'


let app: Application

test.beforeEach(async ({ page, browserName }) => {
  if (browserName === 'chromium') {
    await page.coverage.startJSCoverage()
  }

  app = new Application(page)
  await app.library.open()
})

test.afterEach(async ({ page, browserName }) => {
  if (browserName !== 'chromium') { return }

  const coverage = await page.coverage.stopJSCoverage()
  for (const entry of coverage) {
    const converter = v8toIstanbul('', 0, { source: entry.source || '' })
    await converter.load()
    converter.applyCoverage(entry.functions)
    const report = converter.toIstanbul() as any

    const key = Object.keys(report)[0]
    if (!key) { continue }
    if (key.includes('node_modules')) { continue }
    const normalized_key = key.split('?')[0].replace('/Users/akdasa/Projects/akdasa-studios/shlokas/@akdasa-studios/shlokas/', '')
    const data = { [normalized_key]: report[key] }
    data[normalized_key]["path"] = normalized_key

    const filename = Math.random().toString(36).substr(2, 5)

    fs.writeFile(".nyc_output/coverage_" + filename + ".json", JSON.stringify(data), () => {
      // pass
    })
    // console.log())
  }
})

test.describe('Add verse', () => {
  test('Add verse to the Inbox deck', async () => {
    const verseModal = await app.library.openVerse('BG 1.1')
    await verseModal.clickAddButton()

    await app.toasts.expectToastWithText('Verse BG 1.1 added to inbox')
    await app.tabsBar.expectInboxBadgeValueIs('2')
    await app.library.expectStatusBadgeOfVerseToBe('BG 1.1', 'INBOX')
    await verseModal.expectClosed()
  })

  test('Revert adding verse to the Inbox deck', async () => {
    const verseModal = await app.library.openVerse('BG 1.1')
    await verseModal.clickAddButton()
    await app.toasts.clickRevertOnToast()

    await app.tabsBar.expectInboxBadgeValueIs('')
    await app.library.expectStatusBadgeOfVerseToBe('BG 1.1', undefined)
  })

  test('Add button is hidden if the verse has already been added', async () => {
    const verseModal1 = await app.library.openVerse('BG 1.1')
    await verseModal1.clickAddButton()

    const verseModal2 = await app.library.openVerse('BG 1.1')
    await verseModal2.expectAddButtonIsHidden()
  })
})
