// Utility function to wait for a popup and return the new page
export async function waitForPopup(page) {
    const [newPage] = await Promise.all([
      page.waitForEvent('popup'),
    ]);
    
    // Wait for the new page to load
    await newPage.waitForLoadState('load'); // Consider using 'networkidle' if necessary
    return newPage;
  }
  
  // Utility function to scroll to the bottom of a page
  export async function scrollToBottom(page) {
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }
  