// towxml/towxml.js
const Towxml = require('./main.js'); 
const towxml = new Towxml()
var realWindowWidth = 0;
var realWindowHeight = 0;
var idx = 0
wx.getSystemInfo({
	success: function (res) {
		realWindowWidth = res.windowWidth
		realWindowHeight = res.windowHeight
	}
})
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    md: {
      type: String,
      value: '',
      observer(){
        this.initData();
      }
    },
    host: {
      type: String,
      value: '',
    },
    currThis: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    formatData: null,
    images: [],
    imageUrls: []
  },

  lifetimes: {
    attached: function() {
      
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    initData () {
      if (this.data.md) {
        let data = towxml.toJson(
          this.data.md,
          'markdown' 
        );
        
        this.eachimg(data.child)
        data = towxml.initData(data, {
          base: this.data.host,
          app: this.data.currThis
        });
        // data.theme = "dark"
        this.setData({
          formatData: data
        });
      } 
    },
    link_tap (e) {
      wx.setClipboardData({
        data: e.currentTarget.dataset._el.attr.href,
        success (res) {
          wx.showToast({
            title: '链接已复制！'
          })
        }
      })
      
      // 用于自定义事件
      // var myEventDetail = {
      //   href: e.currentTarget.dataset._el.attr.href,
      //   text: e.currentTarget.dataset._el.child[0].text
      // }
      // var myEventOption = {}
      // this.triggerEvent('linkOnTap', myEventDetail, myEventOption)
    },
    img_load (e) {
      var recal = this.wxAutoImageCal(e.detail.width, e.detail.height);
      this.setData({
        ['images[' + e.target.dataset.idx + ']']: { width: recal.imageWidth, height: recal.imageHeight },
        ['imageUrls[' + e.target.dataset.idx + ']']: e.currentTarget.dataset._el.attr.src
      })
    },
    img_tap (e) {
      var nowImgUrl = e.target.dataset._el.attr.src;
      var imageUrls = this.data.imageUrls,
        newImageUrls = [];
      for (var i in imageUrls) {
        if (imageUrls[i] !== undefined) {
          newImageUrls.push(imageUrls[i]);
        }
      }
      if (newImageUrls.length > 0) {
        wx.previewImage({
          current: nowImgUrl,
          urls: newImageUrls
        })
      }
    },

    // 遍历图片 添加索引
    eachimg (arr) {
      arr.forEach(el => {
        if (el.tag === 'image') {
          el.idx = idx
          idx++
        }
        if (el.child) {
          this.eachimg(el.child)
        }
      })
    },

    // 计算视觉优先的图片宽高
    wxAutoImageCal(originalWidth, originalHeight) {
      var windowWidth = 0, windowHeight = 0;
      var autoWidth = 0, autoHeight = 0;
      var results = {};
      windowWidth = realWindowWidth - 2 * 20;
      windowHeight = realWindowHeight;

      // 判断按照那种方式进行缩放
      // 在图片width大于手机屏幕width时候
      if (originalWidth > windowWidth) {
        autoWidth = windowWidth;
        autoHeight = (autoWidth * originalHeight) / originalWidth;
        results.imageWidth = autoWidth;
        results.imageHeight = autoHeight;
      }
      // 否则展示原来的数据
      else {
        results.imageWidth = originalWidth * 2;
        results.imageHeight = originalHeight * 2;
      }
      return results;
    }
  }
})