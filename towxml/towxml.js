// towxml/towxml.js
const Towxml = require('./main.js'); 
const towxml = new Towxml()
var realWindowWidth = 0;
var realWindowHeight = 0;
wx.getSystemInfo({
	success: function (res) {
		realWindowWidth = res.windowWidth
		realWindowHeight = res.windowHeight
	}
})
Component({
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
    formatData: null
  },

  lifetimes: {
    attached: function() {
      
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    towxml: new Towxml(),
    initData () {
      if (this.data.md) {
        let data = towxml.toJson(
          this.data.md,
          'markdown' 
        );
        
        data = towxml.initData(data, {
          base: this.data.host,
          app: this.data.currThis
        });
        this.setData({
          formatData: data
        });
      } 
    },
    /**
     * 图片视觉宽高计算函数区 
     **/
    wxmlImgLoad (e) {
      var imgwidth = e.detail.width,
        imgheight = e.detail.height,
        ratio = imgwidth / imgheight
      var viewHeight = 750 / ratio;
      var imgheight = viewHeight
      var imgheights = this.data.imgheights
      imgheights.push(imgheight)
      this.setData({
        imgheights: imgheights,
      })
    },
    // 假循环获取计算图片视觉最佳宽高
    calMoreImageInfo(e, idx, that) {

      //因为无法获取view宽度 需要自定义padding进行计算
      var recal = wxAutoImageCal(e.detail.width, e.detail.height, that);
      that.setData({
        ['images[' + idx + ']']: { width: recal.imageWidth, height: recal.imageHeight },
        ['imageUrls[' + idx + ']']: e.currentTarget.dataset.src
      })
    },

    // 计算视觉优先的图片宽高
    wxAutoImageCal(originalWidth, originalHeight, that) {

      // 获取图片的原始长宽
      var windowWidth = 0, windowHeight = 0;
      var autoWidth = 0, autoHeight = 0;
      var results = {};
      var padding = that.data.view.imagePadding;
      windowWidth = realWindowWidth - 2 * padding;
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
        results.imageWidth = originalWidth;
        results.imageHeight = originalHeight;
      }
      return results;
    }
  }
})
