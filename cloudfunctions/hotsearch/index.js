// 云函数入口文件

const cloud = require('wx-server-sdk')
cloud.init()

const { fetchData } = require('./fetch')

// 云函数入口函数
exports.main = async (event, context) => {
  const res = await fetchData()
  return res
}