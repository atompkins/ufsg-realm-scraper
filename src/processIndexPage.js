const cheerio = require('cheerio');
const getPage = require('./getPage');
const processItemPage = require('./processItemPage');

async function doRows($, aRow) {
  const itemAnchor = $('a', aRow);
  const response = await getPage(itemAnchor.attr('href'));
  processItemPage(response);
}

async function processIndexPage({ data }) {
  const $ = cheerio.load(data);
  const mainTable = $('table[width="800"]');
  const thisPageFont = $('tr:first-child font[color="#FF0000"]', mainTable);
  const nextPageAnchor = thisPageFont.parent().next();
  const nextPageUrl = nextPageAnchor.attr('href');
  const nextPageLabel = nextPageAnchor.text();
  const itemRows = $('tr:nth-child(2n+3):not(:last-child)', mainTable).get();
  await itemRows.reduce((p, aRow) => p.then(() => doRows($, aRow)), Promise.resolve(null));
  return { nextPageLabel, nextPageUrl };
}

module.exports = processIndexPage;
