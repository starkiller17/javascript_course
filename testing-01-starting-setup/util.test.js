const puppeteer = require('puppeteer');
const { generateText, checkAndGenerate } = require('./util');

// Function provided by Jest
test('should output name and age', () => {
  const text = generateText('Max', 29);
  // Function provided by Jest
  expect(text).toBe('Max (29 years old)');
  const text2 = generateText('Anna', 32);
  // Function provided by Jest
  expect(text2).toBe('Anna (32 years old)');
});

test('should output data-less text', () => {
  const text = generateText('', null);
  expect(text).toBe(' (null years old)')
});

test('should generate a valid text output',() => {
  const text = checkAndGenerate('Said', 28);
  expect(text).toBe('Said (28 years old)');
});

// The last argument is the time out for the test
test('should create an element with text and correct class', async () => {
  const browser = await puppeteer.launch({
    headless: true,
    // slowMo: 80,
    // args: ['--window-size=1920, 1080']
  });
  const page = await browser.newPage();
  await page.goto(
    "file:///Users/saidmendez/javascript_course/testing-01-starting-setup/index.html"
  );
  await page.click('input#name');
  await page.type('input#name', 'Sandy');
  await page.click('input#age');
  await page.type('input#age', '32');
  await page.click('#btnAddUser');
  const finalText = await page.$eval('.user-item', el => el.textContent);
  expect(finalText).toBe('Sandy (32 years old)');
}, 10000);