
Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled:true,
    btnstate:"default",
    account:"",
    password:"",
    pdpwd:true,
    checked1:true,
  },

  accountInput:function(e){
    var  content  = e.detail.value;
    console.log(content);
    if(content!=''){
      this.setData({disabled:false,btnstate:"primary",account:content});
    }else{
      this.setData({disabled:true,btnstate:"default"});
    }
  },
  pwdBlur: function (e) {
    var password = e.detail.value;
    if (password != '') {
      this.setData({ password: password });
    }
  },
  login_submit:function(e){
    console.log(e);
    var user =  new Object;
    user.count  =   e.detail.value.name_enter;
    user.pwdd  =  e.detail.value.pwd_enter;
  },
  switch_tap:function(e){
    console.log(e.detail.value);
    if (e.detail.value = true) {
      this.setData({ pdpwd: !e.detail.value })
      return;
    } else {
      this.setData({ pdpwd: e.detail.value })
      return;
    }
  },
  // switch_tap(e){
  //   console.log(e.detail.value);
  //   //  while(e.detail.value){
  //     if (e.detail.value = true) {
  //       this.setData({ pdpwd: !e.detail.value })
  //       return;
  //     } else {
  //       this.setData({ pdpwd: e.detail.value })
  //       return;
  //     }
    
  // },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})