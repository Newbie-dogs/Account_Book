// pages/mingxi/mingxi.js
const app = getApp()
const db = wx.cloud.database({
	env:'cloud1-7g964ji564c72fce'
})//数据库
const tb = db.collection('Account')//选择数据表
Page({
	/*页面的初始数据*/
	data: {
		triggered: false,
		showModal: false,
    totalincome:0,
		totalpayment:0,
    datalist:[],
    accountDetails:{
      money: 0,
      is_payment: false,
      date: "",
      type: "",
      mood: "",
      notes: "",
      _id: ""
    }
	},
	// 增加一条记录
	addItem: function(){
    console.log('增加一条记录');
    
  },
  
  //  点击明细条目弹窗显示详情
  showDetails: function(e){
    this.setData({
      showModal:true,
      accountDetails:{
        money: e.target.dataset.res.money,
        is_payment: e.target.dataset.res.is_payment,
        mood: e.target.dataset.res.mood,
        notes: e.target.dataset.res.notes,
        type: e.target.dataset.res.type,
        date: e.target.dataset.res.date,
        _id: e.target.dataset.res._id
      }
    })
  },
	//  点击关闭按钮隐藏
  detailsBack:function(){this.setData({showModal:false})},
  //  点击删除按钮删除记录
  detailsDelete: function(){
    wx.showModal({
      title: '确定要删除此条记录吗？',
      complete: (res) => {
        if (res.cancel) {}
        if (res.confirm) {
          var _this = this;
          tb.doc(_this.data.accountDetails._id).remove().then(res=>{console.log("deleted!")})
            .catch(err=>{console.log("failed!")})
          _this.setData({showModal:false})
          tb.where({username:app.globalData.username}).get().then(res=>{
            _this.setData({datalist:res.data})
          }).catch(err=>{console.log('查询记录失败')});
          (function (){
            var tempincome = 0,temppayment = 0;
            for(var i=0;i<_this.data.datalist.length;i++)
              if(_this.data.datalist[i].is_payment) temppayment+=_this.data.datalist[i].money;
              else tempincome+=_this.data.datalist[i].money;
            _this.setData({totalincome: tempincome,totalpayment: temppayment})
          })()
        }
      }
    })
  },
  
	//  监听用户下拉刷新
	onScrollRefresh: function () {
    var _this = this;
    // 延时1秒
		setTimeout(function(){_this.setData({triggered: false,})},1000);
		// 重新获取数据
	  tb.where({username:app.globalData.username}).get().then(res=>{
		  _this.setData({datalist:res.data})
    }).catch(err=>{console.log('查询记录失败')});
    (function (){
      var tempincome = 0, temppayment = 0;
      for(var i=0;i<_this.data.datalist.length;i++)
        if(_this.data.datalist[i].is_payment) temppayment+=_this.data.datalist[i].money;
        else tempincome+=_this.data.datalist[i].money;
      _this.setData({totalincome: tempincome,totalpayment: temppayment})
    })()
	},

/*生命周期函数--监听页面加载*/onLoad(options) {},
/*生命周期函数--监听页面初次渲染完成*/onReady() {
  var _this = this;
	tb.where({username:app.globalData.username}).get().then(res=>{
		_this.setData({datalist:res.data})
  }).catch(err=>{console.log('查询记录失败')});
  (function (){
    var tempincome = 0, temppayment = 0;
    for(var i=0;i<_this.data.datalist.length;i++)
      if(_this.data.datalist[i].is_payment) temppayment+=_this.data.datalist[i].money;
      else tempincome+=_this.data.datalist[i].money;
    _this.setData({totalincome: tempincome,totalpayment: temppayment})
  })()
},
/*生命周期函数--监听页面显示*/onShow() {
  var _this = this;
  tb.where({username:app.globalData.username}).get().then(res=>{
    _this.setData({datalist:res.data})
  }).catch(err=>{console.log('查询记录失败')});
  (function (){
    var tempincome = 0, temppayment = 0;
    for(var i=0;i<_this.data.datalist.length;i++)
      if(_this.data.datalist[i].is_payment) temppayment+=_this.data.datalist[i].money;
      else tempincome+=_this.data.datalist[i].money;
    _this.setData({totalincome: tempincome,totalpayment: temppayment})
  })()
},
/*生命周期函数--监听页面隐藏*/onHide() {},
/*生命周期函数--监听页面卸载*/onUnload() {},
/*页面相关事件处理函数--监听用户下拉动作*/onPullDownRefresh() {},
/*页面上拉触底事件的处理函数*/onReachBottom() {},
/*用户点击右上角分享*/onShareAppMessage() {},

})