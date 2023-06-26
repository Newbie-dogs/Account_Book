Page({
	/*页面的初始数据*/
	data: {
		showModal: false,
		name:'张三'
	},
	 /*控制显示*/
	emailClick:function(){
		this.setData({
			showModal:true
		})
	},
	/*点击返回按钮隐藏*/
	back:function(){
		this.setData({
			showModal:false
		})
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
	}
	})
	