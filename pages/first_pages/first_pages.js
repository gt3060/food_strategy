// pages/first_pages/first_pages.js

var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  data: {
    indicatorDots: true,
    // imgUrls: [
    //   "/images/logo/first_page_img/first.jpg",
    //   "/images/logo/first_page_img/second.jpg",
    //   "/images/logo/first_page_img/third.jpg",
    //   "/images/logo/first_page_img/fourth.jpg",
    //   "/images/logo/first_page_img/fifth.jpg"
    // ],
    province: '',
    city: '',
    latitude: '',
    longitude: '',
    navs: [],
    navs2:[]
  },
  onLoad: function(options) {
    var page = this;
    var navs = this.loadNavData();
    var navs2 = this.loadNavData2();
    page.setData({
      navs: navs,
      navs2:navs2
    });
    qqmapsdk = new QQMapWX({
      key: '3ULBZ-Q3VW6-MSKS6-EU5RT-MSVC5-G4FX4' //这里自己的key秘钥进行填充
    });
  },
  word:function(event){
    var id = event.target.dataset.id
    console.log("这里这里"+ id);
    if(id == 1){
      wx.navigateTo({
        url: '/pages/first_pages/one/one',
      })

    }else if(id == 2 ){
      wx.navigateTo({
        url: '/pages/first_pages/two/two',
      })

    }else if(id == 3 ){
      wx.navigateTo({
        url: '/pages/first_pages/three/three',
      })
    }else {
      wx.navigateTo({
        url: '/pages/first_pages/four/four',
      })
    }
  },
  onShow: function() {
    let vm = this;
    vm.getUserLocation();
  },
  getUserLocation: function() {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function(res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function(dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        } else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function() {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        console.log(JSON.stringify(res))
        var latitude = res.latitude
        //console.log("经度"+latitude);
        var longitude = res.longitude
        //console.log("纬度"+longitude);
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude)
      },
      fail: function(res) {
        console.log("获取经纬度失败" + 'fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前地理位置
  getLocal: function(latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function(res) {
        console.log(JSON.stringify(res));
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        vm.setData({
          province: province,
          city: city,
          latitude: latitude,
          longitude: longitude
        })
      },
      fail: function(res) {
        console.log("获取当前地理位置失败" + res);
      }
    });
  },
  place_tap: function(e) {
    wx.navigateTo({
      url: '../city/city',
    })
  },
  navBtn: function(event) {

    var postId = event.currentTarget.dataset.postId;
    var postName = event.currentTarget.dataset.postName;
    wx.reLaunch({
      url: '../index/index?postId=' + postId + '&postName=' + postName,
      success: function (res) {
        console.log("传值成功~~~~")
      },
      fail: function (res) {
        console.log("fail！！！！")
      }
    });
    wx.switchTab({
      url: '../index/index',
    });
  },
  loadNavData: function() {
    var navs = [];
    var nav0 = new Object();
    nav0.img = '/images/lvyou/41.jpg';
    nav0.name = '天津';
    nav0.id = 13
    navs[0] = nav0;

    var nav1 = new Object();
    nav1.img = '/images/lvyou/74.jpg';
    nav1.name = '四川';
    nav1.id = 25
    navs[1] = nav1;

    var nav2 = new Object();
    nav2.img = '/images/lvyou/52.jpg';
    nav2.name = '湖北';
    nav2.id = 18
    navs[2] = nav2;
    return navs;
    
  },
  loadNavData2:function(){
    var navs2 = [];
    var nav3 = new Object();
    nav3.img = '/images/lvyou/21.jpg';
    nav3.name = '浙江';
    nav3.id = 21
    navs2[0] = nav3;

    var nav4 = new Object();
    nav4.img = '/images/lvyou/61.jpg';
    nav4.name = '广西';
    nav4.id = 61
    navs2[1] = nav4;

    var nav5 = new Object();
    nav5.img = '/images/lvyou/37.jpg';
    nav5.name = '北京';
    nav5.id = 37
    navs2[2] = nav5;
    return navs2;
  }

})