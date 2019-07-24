// pages/city/city.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    navs: [],
    winHeight:605
  },

  onLoad: function(options) {
    var page = this;
    var navs = this.loadNavData1();
    var navs_log1 = navs.slice(0, 3);
    var navs_log2 = navs.slice(3, 11);
    var navs_log3 = navs.slice(11, 16);
    var navs_log4 = navs.slice(16, 19);
    var navs_log5 = navs.slice(19, 23);
    var navs_log6 = navs.slice(23, 28);
    var navs_log7 = navs.slice(28, 33);
    page.setData({
      navs0:navs,
      navs: navs_log1,
      navs2: navs_log2,
      navs3: navs_log3,
      navs4: navs_log4,
      navs5: navs_log5,
      navs6: navs_log6,
      navs7: navs_log7,
    });
  },

  switchNav: function(e) {
    var page = this;
    if (this.data.currentTab == e.target.dataset.current) {
      return false;
    } else {
      page.setData({
        currentTab: e.target.dataset.current
      });
    }
  },
  loadNavData1: function() {

    var navs = [
      {
        cid:2,
        img: '/images/lvyou/2.jpg',
        name: '黑龙江'
      },
      {
        cid:2,
        img: '/images/lvyou/5.jpg',
        name: '吉林'
      },
      {
        cid:2,
        img: '/images/lvyou/11.jpg',
        name: '辽宁'
      },
      {
        cid: 4,
        img: '/images/lvyou/13.jpg',
        name: '上海'
      },
      {
        cid: 5,
        img: '/images/lvyou/18.jpg',
        name: '江苏'
      },
       {
         cid: 6,
         img: '/images/lvyou/21.jpg',
        name: '浙江'
      },
      {
        cid: 7,
        img: '/images/lvyou/22.jpg',
        name: '安徽'
      },
      {
        cid: 8,
        img: '/images/lvyou/26.jpg',
        name: '福建'
      },
       {
         cid: 9,
         img: '/images/lvyou/29.jpg',
        name: '江西'
      },
      {
        cid: 10,
        img: '/images/lvyou/31.jpg',
        name: '山东'
      },
      {
        cid: 11,
        img: '/images/lvyou/35.jpg',
        name: '台湾'
      },
       {
         cid:12,
         img: '/images/lvyou/37.jpg',
        name: '北京'
      },
      {
        cid:13,
        img: '/images/lvyou/41.jpg',
        name: '天津'
      },
      {
        cid:14,
        img: '/images/lvyou/44.jpg',
        name: '山西'
      },
      {
        cid:15,
        img: '/images/lvyou/45.jpg',
        name: '河北'
      },
      {
        cid:16,
        img: '/images/lvyou/48.jpg',
        name: '内蒙古'
      },
      {
        cid:17,
        img: '/images/lvyou/50.jpg',
        name: '河南 '
      },
      {
        cid:18,
        img: '/images/lvyou/52.jpg',
        name: '湖北'
      },
      {
        cid:19,
        img: '/images/lvyou/56.jpg',
        name: '湖南'
      },
      {
        cid:20,
        img: '/images/lvyou/60.jpg',
        name: '广东 '
      },
      {
        cid:21,
        img: '/images/lvyou/61.jpg',
        name: '广西'
      },
      {
        cid:22,
        img: '/images/lvyou/65.jpg',
        name: '海南'
      },
      {
        cid:23,
        img: '/images/lvyou/67.jpg',
        name: '港澳 '
      },
      {
        cid: 24,
        img: '/images/lvyou/70.jpg',
        name: '重庆'
      },
      {
        cid: 25,
        img: '/images/lvyou/74.jpg',
        name: '四川 '
      },
      {
        cid: 26,
        img: '/images/lvyou/76.jpg',
        name: '贵州'
      },
      {
        cid: 27,
        img: '/images/lvyou/79.jpg',
        name: '云南'
      },
      {
        cid: 28,
        img: '/images/lvyou/80.jpg',
        name: '西藏 '
      },
      {
        cid: 29,
        img: '/images/lvyou/83.jpg',
        name: '陕西'
      },
      {
        cid: 30,
        img: '/images/lvyou/84.jpg',
        name: '甘肃 '
      },
      {
        cid: 31,
        img: '/images/lvyou/86.jpg',
        name: '青海'
      },
      {
        cid: 32,
        img: '/images/lvyou/87.jpg',
        name: '宁夏'
      },
      {
        cid: 33,
        img: '/images/lvyou/90.jpg',
        name: '新疆'
      }
    ]
    return navs;
  },
  onTapToDetail(event){
    var  postId = event.currentTarget.dataset.postId;
    var postName = event.currentTarget.dataset.postName;
    wx.reLaunch({
      url: '../index/index?postId=' +postId+'&postName='+postName,
      success:function(res){
        console.log("传值成功~~~~")
      },
      fail:function(res){
        console.log("fail！！！！")
      }
    });
    wx.switchTab({
      url: '../index/index',
    });
  }
  
})