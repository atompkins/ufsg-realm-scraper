const init = require('./src/init');
const stdout = require('./src/stdout');

init()
  .then(() => stdout('Finished...'))
  .catch((e) => stdout(e));
