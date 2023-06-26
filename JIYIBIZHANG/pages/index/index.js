// index.js
Page({
  gotoPageul(){
    wx.navigateTo({
      url: '../userLogin/userLogin',
      success:console.log('success'),
      fail:console.log('failed'),
    })
  },
  gotoPageur(){
    wx.navigateTo({
      url: '../userRegister/userRegister',
      success:console.log('success'),
      fail:console.log('failed'),
    })
  }




})
