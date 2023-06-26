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
		detailType: 'play',
		showModal: false,
    username:'lyj',
    totalincome:0,
		totalpayment:0,
		datalist:[],
	},

	// 增加一条记录-弹窗
	addItem: function(){
		console.log('增加一条记录');
		this.setData({showModal:true});
	},
	//点击关闭按钮隐藏
	back:function(){
		this.setData({showModal:false})
	},
	/*获取input输入值*/
	wish_put:function(e){
		this.setData({
			textV:e.detail.value
		})
	},
	/*点击确定按钮获取input值并且关闭弹窗*/
	name:function(){
		console.log(this.data.textV)
		this.setData({
			showModal:false,
			name:this.data.textV
		})
	},
	// 监听用户下拉刷新
	onScrollRefresh: function () {
		var that=this;
		// 调用刷新数据函数
		setTimeout(function(){that.setData({triggered: false,})},1000);
	},


/*生命周期函数--监听页面加载*/onLoad(options) {
  
  tb.get().then(res => { console.log('tb init success')})
          .catch(err => {
            console.log('db init fail', err)
					})
	tb.where({username:'lyj'}).get().then(res=>{
		this.setData({datalist:res.data})
		console.log(res.data[0].date)
	}).catch(err=>{
		console.log('查询记录失败')
	})

},
/*生命周期函数--监听页面初次渲染完成*/onReady() {},
/*生命周期函数--监听页面显示*/onShow() {},
/*生命周期函数--监听页面隐藏*/onHide() {},
/*生命周期函数--监听页面卸载*/onUnload() {},
/*页面相关事件处理函数--监听用户下拉动作*/onPullDownRefresh() {},
/*页面上拉触底事件的处理函数*/onReachBottom() {},
/*用户点击右上角分享*/onShareAppMessage() {},

})