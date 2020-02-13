const cheerio = require('cheerio')
const fetch = require('node-fetch')

const GITEE_URL = 'https://gitee.com';

async function fetchData() {
  const data = await fetch(`${GITEE_URL}/explore`);
  const $ = cheerio.load(await data.text());

  const hot = $('.explore-search__hot a').get().map(item => $(item).text())

  return hot
}

exports.fetchData = fetchData
