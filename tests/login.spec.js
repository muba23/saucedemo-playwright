const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const users = require('../data/users.json');

for (const user of users) {
  // Username alone isn't unique (standard_user appears twice), so include the password in the title.
  test(`login as ${user.username} / ${user.password} -> ${user.expected}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(user.username, user.password);

    if (user.expected === 'success') {
        await expect(inventoryPage.title).toHaveText('Products');
        expect(await inventoryPage.isLoaded()).toBe(true);

    } else if (user.expected === 'error') {
        const message = await loginPage.getErrorMessage();
        expect(message).not.toBe('');
    }
    
  });
}