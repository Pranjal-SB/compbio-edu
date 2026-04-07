const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5176/protein-prism');
  await page.waitForSelector('canvas', { timeout: 10000 });
  
  // Wait a bit for the protein to render
  await page.waitForTimeout(2000);
  
  await page.screenshot({ path: '/home/ps/compbio-edu/.sisyphus/evidence/task-5-viewer.png' });
  
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  console.log('Screenshot saved.');
  if (errors.length > 0) {
    console.log('Console errors:', errors);
  } else {
    console.log('No console errors.');
  }
  
  await browser.close();
})();
