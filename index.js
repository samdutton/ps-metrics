const fs = require('fs');
const puppeteer = require('puppeteer');

// For example: https://chromestatus.com/metrics/feature/timeline/popularity/4460
const BASE_URL = 'https://chromestatus.com/metrics/feature/timeline/popularity/';
const features = [
  {name: 'ConversionAPIAll', id: '3365'},
  {name: 'Fledge', id: '4188'},
  {name: 'TopicsAPI_BrowsingTopics_Method', id: '4182'},
  {name: 'TopicsAPIFetch', id: '4460'},
  {name: 'TopicsAPIXhr', id: '4461'},
  {name: 'IframeBrowsingTopicsAttribute', id: '4497'},
];

const FILEPATH = 'public/data/svg.html';

let browser;
const svgElements = [];
// Start timer to measure time taken to get SVGs.
const timer = process.hrtime();

(async () => {
  for (const feature of features) {
    browser = await puppeteer.launch({args: ['--no-sandbox'], headless: 'new'});
    const [page] = await browser.pages();
    const url = BASE_URL + feature.id;
    console.log(`\nOpening page ${url}`);
    await page.goto(url, {
      waitUntil: 'networkidle0',
    });
    const svgElement = await page.$eval('>>> svg[aria-label="A chart."]', (el) => el.outerHTML);
    svgElements.push(`<h2><a href="${url}">${feature.name}</a></h2>\n${svgElement}\n`);
    console.log(`${feature.name} SVG loaded after ${elapsed()} seconds.`);
  }
  const html = svgElements.join('\n');
  // console.log(`${html}\n\n`);
  console.log(`\nRetrieved ${svgElements.length} SVGs in ${elapsed()} seconds.\n`);
  try {
    fs.writeFileSync(FILEPATH, html);
  } catch (err) {
    console.error('>>> Error writing to file:', err);
  } finally {
    console.log(`Wrote SVGs to file ${FILEPATH}`);
  }
})()
  .catch((err) => console.error(err))
  .finally(() => {
    browser.close();
    process.exit();
  });

const elapsed = () => {
  return process.hrtime(timer)[0];
};
