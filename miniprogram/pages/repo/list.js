// miniprogram/pages/repo/list.js
const REPO = require('../../api/repo.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    total_pages: 0,
    per_page: 20,
    repos: null,
    loading: true,
    btmloading: false,
    type: '',
    login: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type
    })
    if (options.type === 'myall') {
      this.getMyall()
      wx.setNavigationBarTitle({
        title: '我的仓库'
      })
    }
    if (options.type === 'all' && options.login) {
      wx.setNavigationBarTitle({
        title: 'TA的仓库'
      })
      this.setData({
        login: options.login
      })
      this.getUserall()
    }
    if (options.type === 'star' && options.login) {
      wx.setNavigationBarTitle({
        title: 'Star的仓库'
      })
      this.setData({
        login: options.login
      })
      this.getStarall()
    }
  },

  getMyall: function () {
    const query = {
      page: this.data.page,
      per_page: this.data.per_page,
      sort: 'pushed'
    }
    REPO.getMyRepos(query).then(res => {
      this.common(res)
    }).catch(err => {
      this.setData({
        loading: false,
        btmloading: false
      })
    })
  },

  getUserall: function () {
    const query = {
      page: this.data.page,
      per_page: this.data.per_page,
      username: this.data.login,
      sort: 'updated'
    }
    REPO.getUserRepos(query).then(res => {
      this.common(res)
    }).catch(err => {
      this.setData({
        loading: false,
        btmloading: false
      })
    })
  },

  getStarall: function () {
    const query = {
      page: this.data.page,
      per_page: this.data.per_page,
      username: this.data.login
    }
    REPO.getUserStars(query).then(res => {
      this.common(res)
    }).catch(err => {
      this.setData({
        loading: false,
        btmloading: false
      })
    })
  },

  common: function (res) {
    if (!this.data.repos) {
      this.setData({
        repos: []
      })
    }
    const repos = this.data.repos.concat(res)
    this.setData({
      repos: repos,
      loading: false,
      btmloading: false
    })
    if (res.length < this.data.per_page) {
      this.setData({
        total_pages: this.data.page
      })
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.total_pages) {
      this.setData({
        btmloading: true,
        page: this.data.page + 1
      })
      if (this.data.type === 'myall') {
        this.getMyall()
      }
      if (this.data.type === 'all') {
        this.getUserall()
      }
      if (this.data.type === 'star') {
        this.getStarall()
      }
    }
  }
})