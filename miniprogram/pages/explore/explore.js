// pages/explore/explore.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    index: 0,
    lang: '',
    page: 1,
    total_pages: 100,
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
        trending: res.result.trending,
        total_pages: res.result.pages,
        loading: false
      })
      const langIndex = wx.getStorageSync('lang')
      if (langIndex) {
        this.setData({
          index: langIndex,
          lang: this.data.langArr[langIndex].query
        })
      }
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
      page: 1,
      loading: true
    })
    wx.setStorageSync('lang', e.detail.value)
    this.getTrending()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      page: 1
    })
    this.getTrending()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 参考 sanshozo
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})