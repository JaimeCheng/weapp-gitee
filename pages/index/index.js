//index.js
//获取应用实例
const app = getApp()

const USER = require('../../api/user.js')
const Base64 = require('../../utils/base64.js').Base64
// const Towxml = require('../../towxml/main'); 

Page({
  data: {
    readme: '',
    currThis: {}
  },

  onLoad: function () {
    USER.demo('/JaimeCheng/e-signature').then(res => {
      console.log(res) 
      // let data = this.towxml.toJson(
      //   Base64.decode(res.content),
      //   'markdown' 
      // );
      // data = this.towxml.initData(data, {
      //   base: '',    // 需要解析的内容中相对路径的资源`base`地址
      //   app: this                     // 传入小程序页面的`this`对象，以用于音频播放器初始化
      // });

      //设置文档显示主题，默认'light'
      // data.theme = 'dark';

      // 设置数据
      // this.setData({
      //   readme1: data
      // });  
      this.setData({
        currThis: this,
        readme: Base64.decode(res.content)
      }) 
      // this['event_bind_tap'] = (event) => {
      //   console.log(event.target.dataset._el);     // 打印出元素信息
      // };
    }).catch(err => {})
  },
  // towxml: new Towxml(),
  wxmlTagATap(e) {
    console.log(e);
  },
  click (e) {
    console.log(e)
  }
})
