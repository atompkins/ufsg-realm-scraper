const sqlite3 = require('sqlite3').verbose();

let db;
let statement;

function createTable() {
  db.run(`CREATE TABLE IF NOT EXISTS data (
      realm_id         integer not null
    , realm_name       text    null
    , level            integer null
    , creature_id      integer not null
    , creature_name    text    null
    , creature_class   text    null
    , primary key      (realm_id, creature_id)
  )`);
}

function prepareStmt() {
  statement = db.prepare(`REPLACE INTO data (
      realm_id
    , realm_name
    , level
    , creature_id
    , creature_name
    , creature_class
  )
  VALUES (
      ?
    , ?
    , ?
    , ?
    , ?
    , ?
  )`);
}

function initSql() {
  db = new sqlite3.Database('data.sqlite');
  db.serialize(() => {
    createTable();
    prepareStmt();
  });
}

function sqlWriter(parsedItem) {
  statement.run(parsedItem);
}

function closeSql() {
  statement.finalize();
  db.close();
}

module.exports = { closeSql, initSql, sqlWriter };
