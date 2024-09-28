import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { waitForPopup, scrollToBottom } from '../utils/helper';

test('user can log in', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // Navigate to login page and perform login
  await loginPage.goto();
  await loginPage.fillUsername('799470085392240');
  await loginPage.fillPassword('Test_123');
  await page.getByRole('button').click();

  // Verify URL after login
  await expect(page).toHaveURL('https://onliner-ui-stage283.voicespin.info/#/permissions');

  // Click on the permission link and wait for the new page
  const divSelector = 'div.permission_link-container';
  await page.waitForSelector(divSelector, { state: 'visible', timeout: 10000 });
  const divElement = page.locator(divSelector).filter({ hasText: 'portal' });
  await divElement.click();

  // Wait for popup and get the new page
  const newPage = await waitForPopup(page);
  const newPageUrl = await newPage.url();
  console.log('New page URL after popup:', newPageUrl);
  
  // Wait for a few seconds before clicking the Terms and Conditions link
  await newPage.waitForTimeout(3000); 

  // Click on the Terms and Conditions link
  const termsAndConditionsLink = newPage.locator('a:text("Terms and Conditions")');
  await termsAndConditionsLink.click();

  // Verify Terms and Conditions dialog visibility
  const termsDivSelector = '.mdc-dialog__container';
  await newPage.waitForSelector(termsDivSelector, { state: 'visible' });
  
  // Scroll to the bottom of the Terms and Conditions dialog
  await scrollToBottom(newPage);
});
