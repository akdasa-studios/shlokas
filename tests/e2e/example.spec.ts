import { test, expect } from '@playwright/test';

test('homepage has title and links to intro page', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Shlokas/)
  const addButton = page.getByText("Add")
  await addButton.click()

  const l = await page.getByText("Memorized").first()
  await expect(await l.innerHTML()).toEqual(" Memorized ")
  // // create a locator
  // const getStarted = page.getByRole('link', { name: 'Get started' });

  // // Expect an attribute "to be strictly equal" to the value.
  // await expect(getStarted).toHaveAttribute('href', '/docs/intro');

  // // Click the get started link.
  // await getStarted.click();

  // // Expects the URL to contain intro.
  // await expect(page).toHaveURL(/.*intro/);
});
