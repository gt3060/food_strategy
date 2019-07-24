// pages/setting/setting.js
Page({


  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    compassVal: 0,
    compassHidden: true,
    text: "",
    winHeight: 0,
    currentTab: 0,
    self: [{
      icon: '/images/logo/call.png',
      title: '联系客服',
      tap: 'callMe'
    },
    {
      icon: '/images/logo/scan.png',
      title: '扫一扫',
      tap: 'scanCode'
    }
    ],
    setting: [
      {
        icon: '/images/logo/system.png',
        title: '系统信息',
        tap: 'systemInfo'
      },
      {
        icon: '/images/logo/luopan.png',
        title: '指南针',
        tap: 'compass'
      },
      {
        icon: '/images/logo/screenlight.png',

        title: '屏幕亮度',
        tap: 'screenLight'
      }
    ]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  //系统信息
  systemInfo: function () {
    wx.navigateTo({
      success: function (res) {
        console.log("success++++")
      },
      fail: function (res) {
        console.log("fail++++")
      },
      url: '../third_pages/device/device'
    })
  },
  //指南针
  compass: function () {
    var that = this;
    this.setData({
      compassHidden: false
    }),
      // wx.startCompass()
      wx.onCompassChange(function (res) {
        console.log(res.direction);
        if (!that.data.compassHidden) {
          that.setData({
            compassVal: res.direction.toFixed(2)
          })
        }
      })

  },
  hideCompass: function () {
    this.setData({
      compassHidden: true

    })
    wx.stopCompass()
  },
  //联系商家
  callMe: function () {
    wx.makePhoneCall({
      phoneNumber: '15572194200',
    })
  },
  //扫一扫
  scanCode: function () {
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },
  sliderbindchange: function (e) {

    this.setData({
      text: e.detail.value / 100
    });
    wx.setScreenBrightness({
      value: this.data.text,
    })
  },
})