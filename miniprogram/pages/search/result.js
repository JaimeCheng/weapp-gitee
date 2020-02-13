// miniprogram/pages/search/result.js
const SEARCH = require('../../api/search.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    page: 1,
    loading: true,
    q: '',
    repos: [],
    users: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.keywords) {
      wx.setNavigationBarTitle({
        title: options.keywords + ' 搜索'
      })
      this.setData({
        q: options.keywords
      })
      this.fetchRepo()
    }
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

  tabChange: function (e) {
    if (!e.detail.name) {
      this.fetchRepo()
    } else {
      this.fetchUser()
    }
  },

  fetchRepo: function () {
    const query = {
      q: this.data.q,
      page: this.data.page
    }
    SEARCH.searchRepo(query).then(res => {
      console.log(res)
      this.setData({
        loading: false
      })
    }).catch(err => {
      console.log(err)
    })
  },

  fetchUser: function () {
    const query = {
      q: this.data.q,
      page: this.data.page
    }
    SEARCH.searchUser(query).then(res => {
      console.log(res)
      this.setData({
        loading: false
      })
    }).catch(err => {
      console.log(err)
    })
  }
})