// pages/login/login.js
import store from '../../store/store'
import create from '../../store/create'

const USER = require('../../api/user.js')
const redirectOld = require('../../utils/util.js').redirectOld
create(store, {

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    currWay: 0,
    way: ['以邮箱密码的方式进行登录', '以更安全的Token方式进行登录']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.update()
    if (this.store.data.token) {
      wx.switchTab({
        url: '../explore/explore',
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  handleLogin: function (e) {
    const formdata = e.detail.value
    if (formdata.username && formdata.username.trim() === '' || formdata.password === '') {
      wx.showToast({
        title: '登录信息不能为空',
        icon: 'none'
      })
      return
    }
    this.setData({
      loading: true
    })
    if (this.data.currWay) {
      USER.login(formdata).then(res => {
        console.log('邮箱密码：登录成功')
        this.setData({
          loading: false
        })
        wx.showToast({
          title: '登录成功'
        })
        wx.setStorageSync('token', res)
        this.store.data.token = res
        this.store.update()
        redirectOld()
      }).catch(err => {
        this.setData({
          loading: false
        })
      })
    } else {
      console.log('私人令牌：登录成功')
      const token = { access_token: formdata.password }
      wx.setStorageSync('token', token)
      this.store.data.token = token
      this.store.update()
      this.setData({
        loading: false
      })
      wx.showToast({
        title: '登录成功'
      })
      redirectOld()
    }
  },

  switchWay: function () {
    this.setData({
      currWay: Number(!this.data.currWay)
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  }
})