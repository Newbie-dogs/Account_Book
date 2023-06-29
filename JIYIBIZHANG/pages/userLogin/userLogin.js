// pages/userLogin/userLogin.js
const app = getApp();
const db = wx.cloud.database({
  env : "cloud1-7g964ji564c72fce"
});
const tb = db.collection('User');
Page({

  /*页面的初始数据*/
  data: {},

  userLogin: function(e){
    console.log(e.detail.value);
    tb.where({username:e.detail.value.username}).get().then(res=>{
      if(res.data.length == 0)
        wx.showModal({
          title: '提示',
          content: '用户不存在！',
          showCancel: false
        })
      else if(res.data[0].password == e.detail.value.password){
        app.globalData.username = res.data[0].username,
        app.globalData.nickname = res.data[0].nickname,
        app.globalData.password = res.data[0].password,
        app.globalData.id = res.data[0]._id,
        wx.switchTab({url: '../list/list'})
      }else wx.showModal({
        title: '提示',
        content: '密码错误！',
        showCancel: false
      })
    }).catch(err=>{console.log('查询记录失败')})

  },

})