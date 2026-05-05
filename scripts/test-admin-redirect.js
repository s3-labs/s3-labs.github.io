const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Go to the dashboard; allow time for client-side redirect
    await page.goto('http://localhost:3000/admin/dashboard', { waitUntil: 'networkidle' });
    // Wait briefly for client-side router to run
    await page.waitForTimeout(1500);
    const final = page.url();
    console.log('finalUrl:', final);

    if (final.endsWith('/admin')) {
      console.log('RESULT: REDIRECTED_TO_ADMIN');
      process.exit(0);
    } else {
      console.log('RESULT: NO_REDIRECT');
      process.exit(2);
    }
  } catch (err) {
    console.error('TEST_ERROR:', err);
    process.exit(3);
  } finally {
    await browser.close();
  }
})();
