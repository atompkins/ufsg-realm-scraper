const cheerio = require('cheerio');
const { sqlWriter } = require('./sqliteWriter');

const getHeading = ($) => /(.+) \(Min Level: (\d+)\)/.exec(
  $('td[width="800"]').find('b').text(),
);

const getTheCreatures = ($) => $('.tHeader:contains(Creatures)')
  .parent()
  .nextAll()
  .find('a')
  .filter((i, e) => $(e).text() !== '')
  .get();

const getCreatureClass = ($el) => $el
  .parent()
  .contents()
  .filter((j, f) => f.type === 'text')
  .text();

const getCreatureInfo = ($) => getTheCreatures($).map((el) => [
  /creature_id=(\d+)/.exec($(el).attr('href'))[1],
  $(el).text(),
  /\((.*)\)/.exec(getCreatureClass($(el)))[1],
]);

function processItemPage({ config, data }) {
  const realmId = /realm_id=(\d+)/.exec(config.url)[1];
  const $ = cheerio.load(data);
  const [, realmName, level] = getHeading($);
  getCreatureInfo($).forEach((aCreature) => {
    sqlWriter([realmId, realmName, level, ...aCreature]);
  });
}

module.exports = processItemPage;
