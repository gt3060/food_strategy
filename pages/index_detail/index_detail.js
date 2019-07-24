// pages/index_detail/index_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ttt: 0,
    f_co: 0,
    f_co_java:0,
    collectionStatus: false,
    zanStatus: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var page = this;
    var postF_id = options.postIdl;
    // console.log("详情"+options);
    console.log("id222=" + postF_id);
    page.setData({
      ttt: postF_id
    });
    wx.request({
      url: 'http://localhost:8080/select_food_Servlet',
      data: {
        java_f_id: this.data.ttt,
        f_co_java: this.data.f_co
      },
      success: function (res) {
        console.log(res)
        var food_detail = res.data;
        var f_co = res.data[0].f_collect
        console.log(res.data[0].f_collect);
        page.setData({
          f_co_java: f_co
        });
        page.setData({
          gt: food_detail
        });
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
    })
    
    this.ls();

  },
  ls: function(e) {
    var page = this;
    wx.request({
      url: 'http://localhost:8080/select_food_Servlet',
      data: {
        java_f_id: this.data.ttt,
        f_co_java: this.data.f_co
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: function(res) {
        console.log(res)
        var food_detail = res.data;
        page.setData({
          gt: food_detail
        });
      },
      fail: function(res) {
        console.log("fail++++")
      },

    })
  },
  onCollectionTap: function(event) {
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
      url: 'http://localhost:8080/Servlet_detail_food',
      data: {
        java_f_id: this.data.ttt,
        f_co_java: this.data.f_co
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: function(res) {
        var food_detail = res.data;
      },
      fail: function(res) {
        console.log("fail++++")
      },

    });
    return 0;

  },
  onzanTap:function(e){
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

  }

 
})