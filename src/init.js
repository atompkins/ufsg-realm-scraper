const getPage = require('./getPage');
const processIndexPage = require('./processIndexPage');
const { closeSql, initSql } = require('./sqliteWriter');

const begin = 'index.php?cmd=realms&index=0';

async function getItems(url) {
  const response = await getPage(url);
  const { nextPageLabel, nextPageUrl } = await processIndexPage(response);
  if (nextPageLabel && nextPageLabel !== 'Last') { // Last
    return getItems(nextPageUrl);
  }
  return false;
}

async function init() {
  initSql();
  await getItems(begin);
  closeSql();
}

module.exports = init;
