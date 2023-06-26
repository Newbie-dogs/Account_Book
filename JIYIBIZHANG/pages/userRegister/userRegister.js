// pages/userRegister/userRegister.js
const db = wx.cloud.database();
const tb = db.collection('User');
Page({

  data:{},

  userRegister: function(e){
    tb.where({username:e.detail.value.username}).get().then(res=>{
      if(res.data.length == 0){
        if(e.detail.value.nickname.trim() === "") wx.showModal({
          title: '提示',
          content: '请输入昵称',
          showCancel: false
        })
        else if(e.detail.value.username.trim() === "") wx.showModal({
          title: '提示',
          content: '用户名不能为空！',
          showCancel: false
        })
        else if(e.detail.value.password == e.detail.value.confirmPassword){
          if(e.detail.value.password === "") wx.showModal({
            title: '提示',
            content: '密码不能为空！',
            showCancel: false
          })
          else tb.add({
            data:{
              username: e.detail.value.username,
              nickname: e.detail.value.nickname,
              password: e.detail.value.password,
              limition_day: -1,
              limition_month: -1,
              limition_year: -1
            }
          }).then(res=>{
            wx.showModal({
              title: '注册成功！',
              showCancel: false,
              complete: (res) => {
                if (res.confirm) wx.navigateTo({url: '../userLogin/userLogin'})
              }
            })
          }).catch(err=>{console.log('注册出错！')})
        }
        else{
          wx.showModal({
            title: '提示',
            content: '两次密码输入不一致！',
            showCancel: false
          })
        }
      }
      else wx.showModal({
        title: '提示',
        content: '用户名已存在！',
        showCancel: false
      })
    }).catch(err=>{console.log('注册失败')})
  },

})