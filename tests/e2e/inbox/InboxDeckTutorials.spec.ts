// import { expect, test } from '@playwright/test'
// import { InboxDeckPage } from '../components'


// test.describe('Inbox Deck', () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto('/home/inbox')
//   })

//   test.describe('Tutorial Cards', () => {
//     test.beforeEach(async ({ page }) => {
//       const inbox = new InboxDeckPage(page)
//       for (const card of inbox.tutorialCardIds) {
//         await inbox.swipeCardLeft(page.getByTestId(card))
//       }
//     })


//     test('Swipe all tutorial cards', async ({ page }) => {
//       const inbox = new InboxDeckPage(page)
//       await expect(inbox.inboxEmpty).toBeVisible()
//     })

//     test('Saves state', async ({ page }) => {
//       const inbox = new InboxDeckPage(page)
//       // eslint-disable-next-line playwright/no-wait-for-timeout
//       await page.waitForTimeout(500) // give time to save
//       await page.reload()
//       await expect(inbox.inboxEmpty).toBeVisible()
//     })
//   })

// })