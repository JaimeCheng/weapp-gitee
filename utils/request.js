// import store from '../store/store.js'

const sys = wx.getSystemInfoSync()
const baseURL = 'https://gitee.com/api'

const urlRegex = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/|www\.)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~+(:)\/._])+$/

var config = {
  'content-type': 'application/json'
}
var configPOST = {
  'content-type': 'application/x-www-form-urlencoded'
}

const request = (options) => {
  // const token = wx.getStorageSync('token')
  // config['Authorization'] = token
  // configPOST['Authorization'] = token
  options.data.access_token = '9167f828112c75a448b82e16e595fbba'
  return new Promise((resolve, reject) => {
    wx.request({
      url: urlRegex.test(options.url) ? `${options.url}` : `${baseURL}${options.url}`,
      method: options.method,
      data: options.data,
      header: options.method === 'POST' ? configPOST : config,
      success(res) {
        console.log('request：success - ' + res.statusCode)
        if (res.statusCode !== 200) {
          reject(res.data)
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        } else {
          console.log('数据获取成功')
          resolve(res.data)
        }
      },
      fail(error) {
        console.log(error)
        wx.showToast({
          title: error.errMsg,
          icon: 'none',
          duration: 2000
        })
        reject(error.errMsg)
      }
    })
  })
}

module.exports = request
