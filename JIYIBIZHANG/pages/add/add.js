const app = getApp();
const db = wx.cloud.database();
const tb = db.collection('Account');
Page({

  data:{
    is_payment: true,
    date: '',
    type:'服务',

    array: ['服务', '餐饮', '娱乐', '购物','运动','交通','教育','其他','转账','红包','工资'],
    objectArray: [
      {
        id: 0,
        name: '服务'
      },
      {
        id: 1,
        name: '餐饮'
      },
      {
        id: 2,
        name: '娱乐'
      },
      {
        id: 3,
        name: '购物'
      },
      {
        id: 4,
        name: '运动'
      },
      {
        id: 5,
        name: '交通'
      },
      {
        id: 6,
        name: '教育'
      },
      {
        id: 7,
        name: '其他'
      },
      {
        id: 8,
        name: '转账'
      },
      {
        id: 9,
        name: '红包'
      },
      {
        id: 10,
        name: '工资'
      },
    ],
  
  },
  bindDateChange: function(e) {
    console.log( e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      type: e.detail.value
    })
  },
  mychange: function(e){
    if(e.detail.value === "outcome") this.setData({is_payment:true});
    else this.setData({is_payment:false});
  },
  adding: function(e){
    let _this = this;
    var tmp = Number(e.detail.value.amount);
    tb.add({
      data:{
        
        username: app.globalData.username,
        is_payment: this.data.is_payment,
        money: tmp,
        date: _this.data.date,
        type: _this.data.array[_this.data.type],
        mood: e.detail.value.motion,
        notes: e.detail.value.remark
      }
    }).then(res=>{
      wx.showModal({
        title: '添加成功！',
        showCancel: false,
        complete: (res) => {
          if (res.confirm) wx.switchTab({url: '../list/list'})
        }
      })
    }).catch(err=>{console.log('添加出错！')})
  }
})

