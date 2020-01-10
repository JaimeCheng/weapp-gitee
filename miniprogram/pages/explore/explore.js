// pages/explore/explore.js
const REPO = require('../../api/repo.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 1,
    index: 0,
    lang: '',
    langArr: [],
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTrending()
    wx.cloud.callFunction({
      name: 'trending',
      data: {
        a: 1,
        b: 2
      },
      success: res => {
        wx.showToast({
          title: '调用成功',
        })
        console.log(res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [sum] 调用失败：', err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  getTrending: function () {
    REPO.trending({ lang: this.data.lang }).then(res => {
      console.log('热门项目获取成功')
      this.setData({
        langArr: res.language,
        explore: res.explore,
        hot: res.hot,
        loading: false
      })
    }).catch(err => {
      this.setData({
        loading: false
      })
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
      lang: this.data.langArr[e.detail.value].query
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})