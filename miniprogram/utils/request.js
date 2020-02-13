import store from '../store/store.js'
const redirectOld = require('./util.js').redirectOld
const baseURL = 'https://gitee.com/api'

const urlRegex = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/|www\.)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~+(:)\/._])+$/

var config = {
  'content-type': 'application/json'
}
var configPOST = {
  'content-type': 'application/x-www-form-urlencoded'
}

const request = (options) => {
  const token = wx.getStorageSync('token')
  // config['Authorization'] = token
  // configPOST['Authorization'] = token
  if (options.data && token) {
    options.data.access_token = token.access_token
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: urlRegex.test(options.url) ? `${options.url}` : `${baseURL}${options.url}`,
      method: options.method,
      data: options.data,
      header: options.method === 'POST' ? configPOST : config,
      success(res) {
        // console.log(res)
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          console.log(res.data)
          reject(res.data)
          if (res.statusCode === 401) {
            if (store.data.token.refresh_token) {
              const postdata = {
                grant_type: 'refresh_token',
                refresh_token: store.data.token.refresh_token
              }
              wx.request({
                url: 'https://gitee.com/oauth/token',
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                data: postdata,
                success(res) {
                  store.data.token = res.data
                  wx.setStorageSync('token', res.data)
                  store.update()
                  redirectOld()
                },
                fail(error) {
                  console.log(error)
                  wx.showToast({
                    title: error.errMsg,
                    icon: 'none',
                    duration: 2000
                  })
                  wx.removeStorageSync('token')
                  store.data.token = null
                  store.update()
                  wx.showToast({
                    title: '登录凭证无效',
                    icon: 'none'
                  })
                  reject(error.errMsg)
                }
              })
            } else {
              wx.removeStorageSync('token')
              store.data.token = null
              store.update()
              wx.showToast({
                title: '登录凭证无效',
                icon: 'none'
              })
            }
          } else {
            wx.showToast({
              title: res.data.error_description || res.data.message,
              icon: 'none',
              duration: 2000
            })
          }
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
