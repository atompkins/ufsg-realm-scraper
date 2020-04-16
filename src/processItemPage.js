const cheerio = require('cheerio');
const { sqlWriter } = require('./sqliteWriter');

function processItemPage({ config, data }) {
  const realmId = /realm_id=(\d+)/.exec(config.url)[1];
  const $ = cheerio.load(data);
  const heading = $('td[width="800"]').find('b').text();
  const chunks = /(.+) \(Min Level: (\d+)\)/.exec(heading);
  const realmName = chunks[1];
  const level = chunks[2];
  $('.tHeader:contains(Creatures)')
    .parent()
    .nextAll()
    .find('a')
    .filter((i, e) => $(e).text() !== '')
    .each((i, e) => {
      const creatureId = /creature_id=(\d+)/.exec($(e).attr('href'))[1];
      const creatureName = $(e).text();
      const creatureClass = /\((.*)\)/.exec(
        $(e)
          .parent()
          .contents()
          .filter((j, f) => f.type === 'text')
          .text(),
      )[1];
      sqlWriter([realmId, realmName, level, creatureId, creatureName, creatureClass]);
    });
}

module.exports = processItemPage;
