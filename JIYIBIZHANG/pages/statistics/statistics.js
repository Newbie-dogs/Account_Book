import * as echarts from '../../ec-canvas/echarts'
Page({
  data: {
    Ec:{
      Load:true
    },
    type: 'income',
    chartOptionData: {
      income:[],
      outcome:[]
    },
    secEc:{
      Load:true
    },
    type: 'income',
    chartOptionData: {
      income:[],
      outcome:[]
    },
    thdEc:{
      Load:true
    },
    type: 'income',
    chartOptionData: {
      income:[],
      outcome:[]
    }
  },

 
  onLoad(options) {
    //获取到组件
    this.Component=this.selectComponent('#mychart-dom')
    this.secComponent=this.selectComponent('#mysecchart-dom')
    this.thdComponent=this.selectComponent('#mythdchart-dom')

    //模拟请求
    setTimeout(()=>{
      //模拟数据
      this.setData({
        chartOptionData : {
          income :[150, 230, 224, 218, 135, 147, 260],
          outcome :[300, 150, 48, 260, 135, 190, 100]
        }
      })
      this.init([150, 230, 224, 218, 135, 147, 260])//模拟数据
    },1000)
  },
  init(optionData){//用来手动初始化
    this.Component.init((canvas,width,height,dpr)=>{
      let chart =echarts.init(canvas,null,{
        width: width,
        height: height,
        devicePixelRatio: dpr
      })
      let option =getOption(optionData)
      chart.setOption(option)
      this.chart=chart//将我们的图表实例绑定到this上，方便我们在其他函数中访问
      return chart
    })
  },
  
  changeType(e){//切换效果
    this.setData({
      type: e.currentTarget.dataset.type
  })
  let option =getOption(this.data.chartOptionData[e.currentTarget.dataset.type])
  this.chart.setOption(option)
  }
})

function getOption(data){
  return{
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: data,
      type: 'line'
    }
  ]
  }
}
