// pages/third_pages/device/device.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneInfo:[],
    weChatInfo:[],
    screenInfo:[],
    val:""      
  },

  onLoad:function(){
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          phoneInfo:[
            {key:'手机型号 ',val:res.model},
            {key:'手机语言 ',val:res.language}
          ],
          weChatInfo:[
            {key:'微信版本', val:res.version},
            {key:'操作系统版本',val:res.system},
            {key:'客户端平台',val:res.platform}
          ],
          screenInfo:[
            {key:'屏幕像素比',val:res.pixelRatio+':1'},
            {key:'屏幕尺寸',val:res.windowWidth*2 + '*' +res.windowHeight*2}
          ]
        })
      },
    });
    wx.getNetworkType({
      success: function(res) {
        that.setData({
          val: res.networkType
        })
      },
    })

  }
})