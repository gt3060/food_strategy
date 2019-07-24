// pages/third_pages/third_pages.js

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    compassVal: 0,
    compassHidden: true,
    text: "",
    winHeight:0,
    currentTab: 0,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onShow:function(){
    this.lll();
    this.gt();
  },
  onLoad: function() {
    if (getApp().globalData.userInfo) {
      this.setData({
        userInfo: getApp().globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这8n种情况
      getApp().userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    };
    
  },
  getUserInfo: function(e) {
    console.log(e);
    getApp().globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  
  lll: function (e) {
    var page = this;
    wx.request({
      url: 'http://localhost:8080/Servlet_coll',
      data: {
        java_coll: 1
      },
      success: function (res) {
        var a = res.data;
        var size = a.length;
        console.log(res.data);
        page.setData({
          ttt: a,
          winHeight: (size + 1) * 98
        });

      },
      fail: function (res) {
        console.log("fail++++")
      },

    })
  },
  gt:function (e) {
    var page = this;
    wx.request({
      url: 'http://localhost:8080/Servlet_coll_place',
      data: {
        java_coll: 1
      },
      success: function (res) {
        var a = res.data;
        var size = a.length;
        console.log(res.data);
        page.setData({
          ppp: a,
          winHeight: (size + 1) * 98
        });

      },
      fail: function (res) {
        console.log("fail++++")
      },

    })
  },
  switchNav: function (e) {
    var page = this;
    if (this.data.currentTab == e.target.dataset.current) {
      return false;
    } else {
      page.setData({ currentTab: e.target.dataset.current })
    }
  },
  food_intro: function (event) {
    var postIdl = event.currentTarget.dataset.postId;
    // console.log(postIdl);
    wx.navigateTo({
      url: '../index_detail/index_detail?postIdl=' + postIdl,
      success: function (res) {
        console.log("传值成功~~~~")
      },
      fail: function (res) {
        console.log("fail！！！！")
      }
    })
  },
  place_intro: function (event) {
    var postIdl = event.currentTarget.dataset.postId;
    wx.navigateTo({
      url: '../index_detail_place/index_detail_place?postIdl=' + postIdl,
      success: function (res) {
        console.log("传值成功~~~~")
      },
      fail: function (res) {
        console.log("fail！！！！")
      }
    })
  },
  setting:function(){
    wx.navigateTo({
      url: '/pages/setting/setting',
    })
  },
  onShareAppMessage: function () {
    return {
      title: '攻略达人',
      path: '/pages/third_pages/third_pages'

    }
  }
  
})