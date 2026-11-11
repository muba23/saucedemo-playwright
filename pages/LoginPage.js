class LoginPage {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Returns the error text if one appears, otherwise an empty string.
   * Waits briefly for the error to render so we don't read it too early.
   */
  async getErrorMessage() {
    try {
      await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
    } catch {
      return '';
    }
    return (await this.errorMessage.innerText()).trim();
  }
}

module.exports = { LoginPage };