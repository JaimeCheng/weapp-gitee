const cheerio = require('cheerio')
const fetch = require('node-fetch')

const GITEE_URL = 'https://gitee.com';

async function fetchData({ lang = '', page = 1 } = {}) {
  const data = await fetch(`${GITEE_URL}/explore/all?lang=${lang}&page=${page}`);
  const $ = cheerio.load(await data.text());
  const langs = $('.explore-languagues__container .menu a').get().map(a => {
    const queryArr = $(a).attr('href').split('=');
    return {
      query: queryArr.length === 2 ? queryArr[1] : '',
      val: $(a).find('span:first-child').text()
    };
  })

  const trending = {
    daily: [],
    weekily: []
  }
  $('.explore-trending-projects__container .tab').each((i, el) => {
    $(el).find('.explore-trending-projects__list-item').each((ix, item) => {
        const title = $(item).find('.title a');
        const desp = $(item).find('.description');
        const obj = {
          repo_title: title.text(),
          repo_path: title.attr('href'),
          repo_url: GITEE_URL + title.attr('href'),
          repo_desc: desp.text()
        };
        if ($(el).attr('data-tab') === 'daily-trending') {
          trending.daily.push(obj)
        } else {
          trending.weekily.push(obj)
        }
      })
  })

  const repos = $('.explore-repo__list .item').get().map(item => {
    const title = $(item).find('.title-left h3 a')
    const avatar = $(item).find('.avatar img').attr('src')
    return {
      avatar_url: avatar ? avatar : '',
      owner_url: GITEE_URL + $(item).find('.avatar').attr('href'),
      repo_title: title.text(),
      repo_path: title.attr('href'),
      repo_url: GITEE_URL + title.attr('href'),
      repo_lang: $(item).find('.project-meta .is-lang').text(),
      repo_desc: $(item).find('.project-desc').text(),
      watch: Number($(item).find('.icon-watch').next().text()),
      star: Number($(item).find('.icon-star').next().text()),
      fork: Number($(item).find('.icon-fork').next().text())
    };
  })
  
  const pages = Number($('#git-discover-page').find('.item:nth-last-child(2)').text())

  return {
    langs,
    repos,
    trending,
    pages
  }
}

exports.fetchData = fetchData
