// miniprogram/pages/search/result.js
const SEARCH = require('../../api/search.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    r_page: 1,
    r_total_pages: null,
    u_page: 1,
    u_total_pages: null,
    per_page: 20,
    q: '',
    repos: null,
    users: null,
    loading: true,
    btmloading: false
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
    if (this.data.active == 0 && !this.data.r_total_pages) {
      this.setData({
        btmloading: true,
        r_page: this.data.r_page + 1
      })
      this.fetchRepo()
    }
    if (this.data.active == 1 && !this.data.u_total_pages) {
      this.setData({
        btmloading: true,
        u_page: this.data.u_page + 1
      })
      this.fetchUser()
    }
  },

  tabChange: function (e) {
    this.setData({ active: e.detail.index })
    if (!e.detail.index && !this.data.repos) {
      this.fetchRepo()
    }
    if (e.detail.index & !this.data.users) {
      this.setData({
        loading: true
      })
      this.fetchUser()
    }
  },

  fetchRepo: function () {
    const query = {
      q: this.data.q,
      page: this.data.r_page,
      per_page: this.data.per_page
    }
    SEARCH.searchRepo(query).then(res => {
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
          r_total_pages: this.data.r_page
        })
      }
    }).catch(err => {
      console.log(err)
      this.setData({
        loading: false,
        btmloading: false
      })
    })
  },

  fetchUser: function () {
    const query = {
      q: this.data.q,
      page: this.data.u_page,
      per_page: this.data.per_page
    }
    SEARCH.searchUser(query).then(res => {
      if (!this.data.users) {
        this.setData({
          users: []
        })
      }
      const users = this.data.users.concat(res)
      this.setData({
        users: users,
        loading: false,
        btmloading: false
      })
      if (res.length < this.data.per_page) {
        this.setData({
          u_total_pages: this.data.u_page
        })
      }
    }).catch(err => {
      this.setData({
        loading: false,
        btmloading: false
      })
    })
  }
})