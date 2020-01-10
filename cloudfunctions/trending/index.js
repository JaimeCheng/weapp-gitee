// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const cheerio = require('cheerio')
const fetch = require('node-fetch')
const { omitBy, isNil } = require('lodash')

const GITEE_URL = 'https://gitee.com/explore/all';

// 云函数入口函数
exports.main = async (event, context) => {
  const data = await fetch(GITEE_URL);
  const $ = cheerio.load(await data.text());
  // const getLang = href => getMatchString(href, /\/trending\/([^?/]+)/i);
  // const langs = $('.explore-languagues__container .menu').map(a => {
  //   const $a = $(a);
  //   return {
  //     query: $a.attr('href'),
  //     name: $a.find('span').text()
  //   };
  // })  
  return {
    langs: data
  }
}