//app.js
import store from 'store/store'

App({
  onLaunch: function () {
    wx.cloud.init({
      traceUser: true
    })
    const token = wx.getStorageSync('token')
    if (token) {
      store.data.token = token
      setTimeout(function () {
        store.update()
      }, 1000)
    }
  }
})