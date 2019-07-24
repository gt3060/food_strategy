// //                                                            
//                                                              
//                                                              
//                                                              
//                                                              
//                                                              
//                                                              
//                                                              
//                                                              
//                                                              
//                                                              
//                                                              
//                                                              
//                                                              
//                                                              
//                                                              
//                                                              
//                                                              
//                                                              
//                                                              
//                                                              
//                                                              
//                                                              
//                                                              
//                                                              
//                                                              
//                                                              
//                                                              
//                                                             
//                                                              
//                                                              
//                                                              
//                                                              
//                                                              
//                                                              
//                                                              
//                                                              
//                                // 



Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    winWidth:0,
    winHeight:0,
    postname:'',
    postid:0,
    winHeight1: 0,
    title:''
  },
  onLoad: function (options) {
    var page  = this;
    wx.getSystemInfo({
      success: function(res) {
        // console.log(res);
        page.setData({winWidth:res.windowWidth})
        // page.setData({winHeight:res.windowHeight})
      },
    });
    // console.log("啦啦啦"+options);
    var postId = options.postId;
    var postName = options.postName;
    // console.log (postId);
    // console.log(postName);
    page.setData({postname:postName,postid:postId});
    this.lll();
    this.gt();
    // page.setData({title:"攻略d"})
  },
  place_tap:function(){
    wx.navigateTo({
      url: '../city/city',
    })
  },
  switchNav:function(e){
    var page  = this;
    if(this.data.currentTab == e.target.dataset.current){
      return false;
    }else{
      page.setData({currentTab:e.target.dataset.current})
    }
  },
  lll: function (e) {
    var page = this;
    wx.request({
      url: 'http://localhost:8080/select_food_Servlet',
      data: {
        java_data_id:this.data.postid
        // java_f_id:
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: function (res) {
        var a = res.data;
        var size = a.length;
        console.log(res.data);
        page.setData({
          ttt:a,
          winHeight:(size+1)*98
        });

      },
      fail: function (res) {
        console.log("fail++++")
      },

    })
  },
  gt: function (e) {
    var page = this;
    wx.request({
      url: 'http://localhost:8080/Servlet_place_select',
      data: {
        java_data_id: this.data.postid
        // java_f_id:
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: function (res) {
        var a = res.data;
        var size = a.length;
        console.log(res.data);
        page.setData({
          ppp: a,
          winHeight:(size+1)*98
        });

      },
      fail: function (res) {
        console.log("fail++++")
      },

    })
  },
  food_intro:function(event){
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
    // console.log(postIdl);
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
  onShareAppMessage:function(){
    return{
      title:'攻略达人',
      path:'/pages/index/index'

    }
  }

})