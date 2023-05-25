const axios = require('axios');
const rateLimit = require('axios-rate-limit');

const api = rateLimit(axios.create({ baseURL: 'https://guide.fallensword.com/' }), { maxRPS: 10 });

function getPage(url) {
  return api.get(url);
}

module.exports = getPage;
