// miniprogram/staticPack/about/author.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  feedback: function () {
    wx.navigateToMiniProgram({
      appId: 'wx8abaf00ee8c3202e',
      extraData: {
        id: '125954'
      }
    })
  },

  toRepo: function () {
    wx.navigateTo({
      url: '../../pages/repo/home?path=JaimeCheng/weapp-gitee'
    })
  },

  copyIt: function () {
    wx.setClipboardData({
      data: 'https://github.com/JaimeCheng/weapp-gitee',
      success (res) {
        wx.showToast({
          title: '链接已复制！'
        })
      }
    })
  },
})