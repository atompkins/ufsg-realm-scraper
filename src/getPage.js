const axios = require('axios');

const api = axios.create({
  baseURL: 'https://guide.fallensword.com/',
});

function getPage(url) {
  return api.get(url);
}

module.exports = getPage;
