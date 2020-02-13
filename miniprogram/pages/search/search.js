// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keywords: '',
    history: [],
    hot: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const historyArr = wx.getStorageSync('searchArr')
    const hotSearch = wx.getStorageSync('hotsearch')
    if (historyArr) {
      this.setData({
        history: historyArr.split('$&')
      })
    }
    if (hotSearch) {
      this.setData({
        hot: hotSearch.split(',')
      })
    }
    this.getHot()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  getHot: function () {
    wx.cloud.callFunction({
      name: 'hotsearch'
    }).then(res => {
      console.log('云函数[hotsearch]调用成功')
      this.setData({
        hot: res.result
      })
      wx.setStorageSync('hotsearch', res.result.join(','))
    }).catch(err => {
      wx.showToast({
        icon: 'none',
        title: '云函数调用失败',
      })
      console.error('云函数[trending]调用失败：', err)
    })
  },

  onSearch: function (e) {
    const keywords = e.detail.trim()
    if (keywords === '') {
      wx.showToast({
        title: '请输入关键词',
        icon: 'none'
      })
      return
    }
    var searchArr = wx.getStorageSync('searchArr') && wx.getStorageSync('searchArr').split('$&')
    if (searchArr.length > 0) {
      if (searchArr.indexOf(keywords) < 0) {
        searchArr.push(keywords)
      }
      if (searchArr.length === 11) {
        searchArr.shift()
      }
    } else {
      searchArr = [keywords]
    }
    wx.setStorageSync('searchArr', searchArr.join('$&'))
    this.setData({
      history: searchArr
    })
    this.toSearch(keywords)
  },

  toSearch: function (e) {
    const keywords = (e.target && e.target.dataset.text) || e
    wx.navigateTo({
      url: './result?keywords=' + keywords,
    })
  },

  clearAll: function () {
    wx.showModal({
      content: '确认删除全部搜索记录？',
      success: res => {
        if (res.confirm) {
          wx.setStorageSync('searchArr', '')
          this.setData({
            history: []
          })
        }
      }
    })
  }
})