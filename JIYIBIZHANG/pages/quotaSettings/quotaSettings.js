// pages/quotaSettings/quotaSettings.js
const app = getApp();
const db = wx.cloud.database();
const tb = db.collection('User');
Page({

  data: {
    day: -1,
    month: -1,
    year: -1,
    showday: '未设置',
    showmonth: '未设置',
    showyear: '未设置',
    tmpday: -1,
    tmpmonth: -1,
    tmpyear: -1
  },
  
  onLoad: function(){
    tb.doc(app.globalData.id).get().then(res=>{
      var tmpstr1 = "",tmpstr2 = "",tmpstr3 = "";
      this.setData({
        day: res.data.limition_day,
        month: res.data.limition_month,
        year: res.data.limition_year
      })
      if(res.data.limition_day < 0) this.setData({showday: '未设置'});
      else{
        tmpstr1 = '￥'+res.data.limition_day.toString();
        this.setData({showday: tmpstr1});
      }
      if(res.data.limition_month < 0) this.setData({showmonth: '未设置'});
      else{
        tmpstr2 = '￥'+res.data.limition_month.toString();
        this.setData({showmonth: tmpstr2});
      }
      if(res.data.limition_year < 0) this.setData({showyear: '未设置'});
      else{
        tmpstr3 = '￥'+res.data.limition_year.toString();
        this.setData({showyear: tmpstr3});
      }
    }).catch(err=>{console.log(err)})
  },

  dayTypeIn: function(e){
    var tmpnum = Number(e.detail.value);
    if(e.detail.value == 0) this.setData({tmpday: -1});
    else this.setData({tmpday: tmpnum});
  },
  monthTypeIn: function(e){
    var tmpnum = Number(e.detail.value);
    if(e.detail.value == 0) this.setData({tmpmonth: -1});
    else this.setData({tmpmonth: tmpnum});
  },
  yearTypeIn: function(e){
    var tmpnum = Number(e.detail.value);
    if(e.detail.value == 0) this.setData({tmpyear: -1});
    else this.setData({tmpyear: tmpnum});
  },
  changeDay: function(){
    var _this = this, tmpstr = '￥'+_this.data.tmpday.toString();
    tb.doc(app.globalData.id).update({data:{limition_day: _this.data.tmpday}}).then(res=>{
      if(_this.data.tmpday < 0) _this.setData({day: -1,showday: "未设置"});
      else _this.setData({day: _this.data.tmpday,showday: tmpstr});
      wx.showModal({title: '修改成功！',showCancel: false});
    }).catch(err=>{{
      console.log(err);
      wx.showModal({title: '修改失败，请重试！',showCancel: false});
    }})
  },
  changeMonth: function(){
    var _this = this, tmpstr = '￥'+_this.data.tmpmonth.toString();
    tb.doc(app.globalData.id).update({data:{limition_month: _this.data.tmpmonth}}).then(res=>{
      if(_this.data.tmpmonth < 0) _this.setData({month: -1,showmonth: "未设置"});
      else _this.setData({month: _this.data.tmpmonth,showmonth: tmpstr});
      wx.showModal({title: '修改成功！',showCancel: false});
    }).catch(err=>{{
      console.log(err);
      wx.showModal({title: '修改失败，请重试！',showCancel: false});
    }})
  },
  changeYear: function(){
    var _this = this, tmpstr = '￥'+_this.data.tmpyear.toString();
    tb.doc(app.globalData.id).update({data:{limition_year: _this.data.tmpyear}}).then(res=>{
      if(_this.data.tmpyear < 0) _this.setData({year: -1,showyear: "未设置"});
      else _this.setData({year: _this.data.tmpyear,showyear: tmpstr});
      wx.showModal({title: '修改成功！',showCancel: false});
    }).catch(err=>{{
      console.log(err);
      wx.showModal({title: '修改失败，请重试！',showCancel: false});
    }})
  },
})  