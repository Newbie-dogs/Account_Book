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
    daytotal: 0,
    monthtotal: 0,
    yeartotal:0,
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
    wx.navigateTo({url: '../add/add'})
  },
  //  统计年月日支出和
  count: function(tmparray){
    var nowtime = new Date(),tmptime;
    this.data.daytotal = 0;
    this.data.monthtotal = 0;
    this.data.yeartotal = 0;
    for(var i=0;i<tmparray.length;i++){
      tmptime = new Date(tmparray[i].date);
      if(nowtime.getFullYear() == tmptime.getFullYear()){
        this.data.yeartotal+=tmparray[i].money;
        if(nowtime.getMonth() == tmptime.getMonth()){
          this.data.monthtotal+=tmparray[i].money;
          if(nowtime.getDate() == tmptime.getDate())
           this.data.daytotal+=tmparray[i].money;
        }
      }
    }
  },
  //  判断是否超支
  check: function(){
    db.collection('User').doc(app.globalData.id).get().then(res=>{
      if(res.data.limition_year>0) if(this.data.yeartotal>res.data.limition_year) wx.showModal({title: '注意',content: '您今年的支出已经超出预期！',showCancel: false});
      else if(this.data.yeartotal>(0.8*res.data.limition_year)) wx.showModal({title: '注意',content: '您今年的支出已经接近预期！',showCancel: false});
      else if(this.data.yeartotal>(0.5*res.data.limition_year)) wx.showModal({title: '注意',content: '您今年的支出预期已经过半！',showCancel: false});
      if(res.data.limition_month>0) if(this.data.monthtotal>res.data.limition_month) wx.showModal({title: '注意',content: '您本月的支出已经超出预期！',showCancel: false});
      else if(this.data.monthtotal>(0.8*res.data.limition_month)) wx.showModal({title: '注意',content: '您本月的支出已经接近预期！',showCancel: false});
      else if(this.data.monthtotal>(0.5*this.data.res.data.limition_month)) wx.showModal({title: '注意',content: '您本月的支出预期已经过半！',showCancel: false});
      if(res.data.limition_day>0) if(this.data.daytotal>res.data.limition_day) wx.showModal({title: '注意',content: '您今日的支出已经超出预期！',showCancel: false});
      else if(this.data.daytotal>(0.8*res.data.limition_day)) wx.showModal({title: '注意',content: '您今日的支出已经接近预期！',showCancel: false});
      else if(this.data.daytotal>(0.5*res.data.limition_day)) wx.showModal({title: '注意',content: '您今日的支出预期已经过半！',showCancel: false});
    }).catch(err=>{console.log(err)});
  },
  //刷新数据函数
  refreshData: function(){
    let _this = this;
    tb.where({username:app.globalData.username}).get().then(res=>{
      var tmp = res;
      tmp.data.sort(function (a, b) {
        var dateA = new Date(a.date);
        var dateB = new Date(b.date);
        if (dateA < dateB) return 1;
        else return -1;
      });
      _this.setData({datalist:tmp.data},function(){
        var tempincome = 0, temppayment = 0;
        for(var i=0;i<res.data.length;i++)
          if(res.data[i].is_payment) temppayment+=res.data[i].money;
          else tempincome+=res.data[i].money;
        _this.setData({totalincome: tempincome,totalpayment: temppayment})
      });
      tb.where({username: app.globalData.username,is_payment: true}).get().then(res=>{
        new Promise((resolve,reject)=>{
          console.log('get payment');
          _this.count(res.data);
          resolve("1");
        }).then((ress)=>{
          _this.check();
        }).catch((err)=>{console.log(err,'ck failed')})
      }).catch(err=>{console.log('查询记录失败')});
    }).catch(err=>{console.log('查询记录失败')});
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
    let _this = this;
    wx.showModal({
      title: '确定要删除此条记录吗？',
      complete: (res) => {
        if (res.cancel) {}
        if (res.confirm) {
          tb.doc(_this.data.accountDetails._id).remove().then(res=>{console.log("deleted!")})
            .catch(err=>{console.log("failed!")});
          _this.setData({showModal:false},_this.refreshData());
        }
      }
    })
  },

	//  监听用户下拉刷新
	onScrollRefresh: function () {
    var _this = this;
    // 延时1秒，并重新获取数据
		setTimeout(function(){
      _this.setData({triggered: false},_this.refreshData())
    },1000);
	},

/*生命周期函数--监听页面加载*/onLoad(options) {},
/*生命周期函数--监听页面初次渲染完成*/onReady() {},
/*生命周期函数--监听页面显示*/onShow() {this.refreshData();},
/*生命周期函数--监听页面隐藏*/onHide() {},
/*生命周期函数--监听页面卸载*/onUnload() {},
/*页面相关事件处理函数--监听用户下拉动作*/onPullDownRefresh() {},
/*页面上拉触底事件的处理函数*/onReachBottom() {},
/*用户点击右上角分享*/onShareAppMessage() {},

})