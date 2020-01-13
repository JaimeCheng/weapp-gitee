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
    page: 1,
    langArr: [],
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTrending()
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  getTrending: function () {
    wx.cloud.callFunction({
      name: 'trending',
      data: {
        lang: this.data.lang,
        page: this.data.page
      }
    }).then(res => {
      console.log('云函数[trending]调用成功')
      this.setData({
        langArr: res.result.langs,
        repos: res.result.repos,
        hot: res.result.hot,
        loading: false
      })
    }).catch(err => {
      this.setData({
        loading: false
      })
      wx.showToast({
        icon: 'none',
        title: '云函数调用失败',
      })
      console.error('云函数[trending]调用失败：', err)
    })
  },
  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value,
      lang: this.data.langArr[e.detail.value].query,
      page: 1
    })
    this.getTrending()
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