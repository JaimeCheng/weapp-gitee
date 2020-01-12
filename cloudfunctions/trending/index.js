// 云函数入口文件

const cloud = require('wx-server-sdk')
cloud.init()

const { fetchAllLanguages, fetchHotTrending } = require('./fetch')

// 云函数入口函数
exports.main = async (event, context) => {
  const langs = await fetchAllLanguages()
  const { daily, weekily } = await fetchHotTrending()
  return {
    langs,
    daily,
    weekily
  }
}