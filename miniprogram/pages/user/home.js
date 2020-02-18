// miniprogram/pages/user/home.js
const USER = require('../../api/user.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    empty: '--'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.login) {
      wx.setNavigationBarTitle({
        title: options.login
      })
      this.fetchInfo(options.login)
    }
  },

  fetchInfo: function (username) {
    USER.getUserInfo(username).then(res => {
      this.setData({
        userInfo: res
      })
    }).catch(err => {
      console.log(err)
    })
  },

  copyIt: function (e) {
    const data = e.currentTarget.dataset.text
    if (data) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.text,
        success (res) {
          wx.showToast({
            title: '内容已复制！'
          })
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})