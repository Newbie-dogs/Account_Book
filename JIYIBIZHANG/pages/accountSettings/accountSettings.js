// pages/accountSettings/accountSettings.js
const app = getApp();
const db = wx.cloud.database();
const tb = db.collection("User");
Page({
  
  data: {
    username: "",
    nickname: "",
    password: "",
    tempNickname: "",
    showModal: false,
  },

  onShow() {
    this.setData({
      username: app.globalData.username,
      nickname: app.globalData.nickname,
      password: app.globalData.password,
    });
  },

  nicknameTypeIn: function(e){this.setData({tempNickname: e.detail.value});},
  changeNickname: function(){
    var _this = this;
    wx.showModal({
      title: '确定要修改昵称吗？',
      complete: (res) => {
        if (res.confirm){
          tb.doc(app.globalData.id).update({data: {nickname: _this.data.tempNickname}}).then(res=>{
            _this.setData({nickname: _this.data.tempNickname});
            app.globalData.nickname = _this.data.tempNickname;
            wx.showModal({title: '更新成功！',showCancel: false,})
          }).catch(err=>{
            console.log(err);
            wx.showModal({title: '修改失败，请重试！',showCancel: false});
          })
        }
      }
    })
  },
  changePassword: function(){this.setData({showModal: true});},
  clickBack: function(){this.setData({showModal:false});},
  change: function(e){
    if(e.detail.value.oldPassword == app.globalData.password){
      if(e.detail.value.newPassword == e.detail.value.renewPassword){
        let _this = this;
        tb.doc(app.globalData.id).get().then(res=>{
          console.log(res.data)
        }).catch(err=>{console.log(err)});
        tb.doc(app.globalData.id).update({data:{password: e.detail.value.newPassword}})
          .then(res=>{
            _this.setData({password: e.detail.value.newPassword});
            app.globalData.password = e.detail.value.newPassword;
            wx.showModal({title: '修改成功！',showCancel: false,});
          }).catch(err=>{
            console.log(err);
            wx.showModal({title: '修改失败，请重试！',showCancel: false});
          })
      }
      else wx.showModal({title: '两次输入密码不一致！',showCancel: false,});
    }
    else wx.showModal({title: '原密码不正确！',showCancel: false,});
  }

})

