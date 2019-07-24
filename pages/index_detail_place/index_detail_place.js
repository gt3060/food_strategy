// pages/index_detail/index_detail.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ttt: 0,
    f_co: 0,
    collectionStatus: false,
    f_co_java:0,
    zanStatus: false,
    // aa:0
    e:'111',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this;
    var postF_id = options.postIdl;
    // console.log("详情"+options);
    console.log("id222=" + postF_id);
    page.setData({
      ttt: postF_id
    });
    qqmapsdk = new QQMapWX({
      key: '3ULBZ-Q3VW6-MSKS6-EU5RT-MSVC5-G4FX4' //这里自己的key秘钥进行填充
    });
    //console.log("地址11:" + this.data.e);
    // console.log("地址22:"+page.data.e);
    //this.showMap();
    wx.request({
      url: 'http://localhost:8080/Servlet_place_select',
      data: {
        java_f_id: this.data.ttt,
        f_co_java: this.data.f_co
      },
      method: 'GET',
      success: function (res) {
        //console.log(res)
        var food_detail = res.data;
        var f_co = res.data[0].p_collect
        // console.log(res.data[0].p_collect);
        page.setData({
          f_co_java: f_co
        });
        // page.setData({
        //   gt: food_detail
        // });
        if (f_co == 1) {
          page.setData({
            collectionStatus: true,
          })

        } else {
          page.setData({
            collectionStatus: false,
          })
        }
      },
      fail: function (res) {
        console.log("fail++++")
      },

    })
    

    this.ls();


  },
  ls: function (e) {
    var page = this;
    wx.request({
      url: 'http://localhost:8080/Servlet_place_select',
      data: {
        java_f_id: this.data.ttt,
        f_co_java: this.data.f_co
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: function (res) {
        //console.log(res)
        var food_detail = res.data;
        var f_co = res.data[0].p_collect;
        var a = res.data[0].p_place;
        page.setData({
          f_co: f_co,
          e:a
        });
        page.setData({
          gt: food_detail
        });
      },
      fail: function (res) {
        console.log("fail++++")
      },

    })
  },
  onCollectionTap: function (event) {
    var page = this;
    if (page.data.collectionStatus == false) {
      var ls = this.data.f_co + 1;
      this.setData({
        f_co: ls,
        collectionStatus: true
      });

    } else if (page.data.collectionStatus == true) {
      var ls = this.data.f_co - 1;
      this.setData({
        f_co: ls,
        collectionStatus: false
      });
    };
    wx.showToast({
      title: this.data.collectionStatus ? "收藏成功" : "取消收藏",
      duration: 1000,
      icon: "success",
      mask: true
    })
    wx.request({
      url: 'http://localhost:8080/Servlet_detail_place',
      data: {
        java_f_id: this.data.ttt,
        f_co_java: this.data.f_co
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: function (res) {
        console.log("shoucang" + res.data)
        var food_detail = res.data;
        page.setData({
          f_co:food_detail,
          // e:res.data
        });
      },
      fail: function (res) {
        console.log("fail++++")
      },

    });
    return 0;

  },
  onzanTap: function (e) {
    var page = this;
    if (page.data.zanStatus == false) {
      this.setData({
        zanStatus: true
      });
    } else if (page.data.zanStatus == true) {
      this.setData({
        zanStatus: false
      });
    };

  },



  showMap: function (e) {
    var that = this
    var add = e.currentTarget.dataset.postAdd;
    qqmapsdk.geocoder({
      address: add,
      success: function (res) {
        console.log(res);
        var res = res.result;
        var latitude = res.location.lat;
        var longitude = res.location.lng;
        //根据地址解析在地图上标记解析地址位置
        that.setData({ // 获取返回结果，放到markers及poi中，并在地图展示
          markers: [{
            id: 0,
            title: res.title,
            latitude: latitude,
            longitude: longitude,
            //iconPath: '../../image/dingwei.png', //图标路径
            width: 20,
            height: 20,
            callout: { //可根据需求是否展示经纬度
              content: latitude + ',' + longitude,
              color: '#000',
              display: 'ALWAYS'
            }
          }],
          poi: { //根据自己data数据设置相应的地图中心坐标变量名称
            latitude: latitude,
            longitude: longitude
          }
        });
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    })
  }


})