const cheerio = require('cheerio')
const fetch = require('node-fetch')
const { omitBy, isNil } = require('lodash')

const GITEE_URL = 'https://gitee.com/explore/all';
const GITEE_HOST = 'https://gitee.com'

function omitNil(object) {
  return omitBy(object, isNil);
}

function removeDefaultAvatarSize(src) {
  /* istanbul ignore if */
  if (!src) {
    return src;
  }
  return src.replace(/\?s=.*$/, '');
}

async function fetchAllLanguages() {
  const data = await fetch(GITEE_URL);
  const $ = cheerio.load(await data.text());
  const langs = $('.explore-languagues__container .menu a').get().map(a => {
    const queryArr = $(a).attr('href').split('=');
    return {
      query: queryArr.length === 2 ? queryArr[1] : '',
      val: $(a).find('span:first-child').text()
    };
  })
  return langs;
}

async function fetchHotTrending() {
  const data = await fetch(GITEE_URL);
  const $ = cheerio.load(await data.text());
  const hot = {
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
          repo_url: GITEE_HOST + title.attr('href'),
          repo_desc: desp.text()
        };
        if ($(el).attr('data-tab') === 'daily-trending') {
          hot.daily.push(obj)
        } else {
          hot.weekily.push(obj)
        }
      })
  })
  return hot;
}

async function fetchRepositories({
  language = '',
  since = 'daily',
} = {}) {
  const url = `${GITHUB_URL}/trending/${language}?since=${since}`;
  const data = await fetch(url);
  const $ = cheerio.load(await data.text());
  return (
    $('.Box article.Box-row')
      .get()
      // eslint-disable-next-line complexity
      .map(repo => {
        const $repo = $(repo);
        const title = $repo
          .find('.h3')
          .text()
          .trim();
        const [username, repoName] = title.split('/').map(v => v.trim());
        const relativeUrl = $repo
          .find('.h3')
          .find('a')
          .attr('href');
        const currentPeriodStarsString =
          $repo
            .find('.float-sm-right')
            .text()
            .trim() || /* istanbul ignore next */ '';

        const builtBy = $repo
          .find('span:contains("Built by")')
          .find('[data-hovercard-type="user"]')
          .map((i, user) => {
            const altString = $(user)
              .children('img')
              .attr('alt');
            const avatarUrl = $(user)
              .children('img')
              .attr('src');
            return {
              username: altString
                ? altString.slice(1)
                : /* istanbul ignore next */ null,
              href: `${GITHUB_URL}${user.attribs.href}`,
              avatar: removeDefaultAvatarSize(avatarUrl),
            };
          })
          .get();

        const colorNode = $repo.find('.repo-language-color');
        const langColor = colorNode.length
          ? colorNode.css('background-color')
          : null;

        const langNode = $repo.find('[itemprop=programmingLanguage]');

        const lang = langNode.length
          ? langNode.text().trim()
          : /* istanbul ignore next */ null;

        return omitNil({
          author: username,
          name: repoName,
          avatar: `${GITHUB_URL}/${username}.png`,
          url: `${GITHUB_URL}${relativeUrl}`,
          description:
            $repo
              .find('p.my-1')
              .text()
              .trim() || /* istanbul ignore next */ '',
          language: lang,
          languageColor: langColor,
          stars: parseInt(
            $repo
              .find(".mr-3 svg[aria-label='star']")
              .first()
              .parent()
              .text()
              .trim()
              .replace(',', '') || /* istanbul ignore next */ '0',
            10
          ),
          forks: parseInt(
            $repo
              .find("svg[aria-label='repo-forked']")
              .first()
              .parent()
              .text()
              .trim()
              .replace(',', '') || /* istanbul ignore next */ '0',
            10
          ),
          currentPeriodStars: parseInt(
            currentPeriodStarsString.split(' ')[0].replace(',', '') ||
              /* istanbul ignore next */ '0',
            10
          ),
          builtBy,
        });
      })
  );
}

async function fetchDevelopers({ language = '', since = 'daily' } = {}) {
  const data = await fetch(
    `${GITHUB_URL}/trending/developers/${language}?since=${since}`
  );
  const $ = cheerio.load(await data.text());
  return $('.Box article.Box-row')
    .get()
    .map(dev => {
      const $dev = $(dev);
      const relativeUrl = $dev.find('.h3 a').attr('href');
      const name = $dev
        .find('.h3 a')
        .text()
        .trim();

      const username = relativeUrl.slice(1);

      const type = $dev
        .find('img')
        .parent()
        .attr('data-hovercard-type');

      const $repo = $dev.find('.mt-2 > article');

      $repo.find('svg').remove();

      return omitNil({
        username,
        name,
        type,
        url: `${GITHUB_URL}${relativeUrl}`,
        avatar: removeDefaultAvatarSize($dev.find('img').attr('src')),
        repo: {
          name: $repo
            .find('a')
            .text()
            .trim(),
          description:
            $repo
              .find('.f6.mt-1')
              .text()
              .trim() || /* istanbul ignore next */ '',
          url: `${GITHUB_URL}${$repo.find('a').attr('href')}`,
        },
      });
    });
}

exports.fetchAllLanguages = fetchAllLanguages
exports.fetchHotTrending = fetchHotTrending
exports.fetchDevelopers = fetchDevelopers
