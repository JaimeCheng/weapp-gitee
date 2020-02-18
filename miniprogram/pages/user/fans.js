// miniprogram/pages/user/fans.js
const USER = require('../../api/user.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    total_pages: null,
    per_page: 20,
    username: '',
    users: null,
    loading: true,
    btmloading: false,
    text: '- 啊哦，还没有粉丝 -'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.login && options.type) {
      wx.setNavigationBarTitle({
        title: options.type === 'followers' ? '粉丝' : '关注'
      })
      this.setData({
        username: options.login,
        type: options.type,
        text: options.type === 'followers' ? '- 啊哦，还没有粉丝 -' : '- 暂未关注任何用户 -'
      })
      this.fetchUsers()
    }
  },
  
  fetchUsers: function () {
    const query = {
      username: this.data.username,
      page: this.data.page,
      per_page: this.data.per_page,
      type: this.data.type
    }
    USER.getFans(query).then(res => {
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
          total_pages: this.data.page
        })
      }
    }).catch(err => {
      this.setData({
        loading: false,
        btmloading: false
      })
    })
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
      this.fetchUsers()
    }
  }

})