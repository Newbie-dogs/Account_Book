// import { decodeBase64 } from 'XrFrame/kanata/lib/index';
import * as echarts from '../../ec-canvas/echarts'
const app = getApp();
const db=wx.cloud.database();
const tb=db.collection('Account');
Page({
  data: {
    Ec:{Load:true},
    secEc:{Load:true},
    thdEc:{Load:true},
    type: 'outcome',
    chartOptionData: {
      income:[],
      outcome:[],
      incometype:[],
      outcometype:[],
    },
    payment:[],
    isReady: false,
  },
  getLaterPayment: function(){
    
    tb.where({username:app.globalData.username}).orderBy("date","desc").get().then(res=>{

    })
  },
 
  getPayment: function(){
    var tmp0 = 0,i;
    tb.where({username:app.globalData.username,type:"服务"}).get().then(res=>{
      for(i=0;i<res.data.length;i++) tmp0+=res.data[i].money;
      this.data.payment[0] = tmp0;
    })
    var tmp1 = 0;
    tb.where({username:app.globalData.username,type:"餐饮"}).get().then(res=>{
      for(i=0;i<res.data.length;i++) tmp1+=res.data[i].money;
      this.data.payment[1] = tmp1;
    })
    var tmp2 = 0;
    tb.where({username:app.globalData.username,type:"娱乐"}).get().then(res=>{
      for(i=0;i<res.data.length;i++) tmp2+=res.data[i].money;
      this.data.payment[2] = tmp2;
    })
    var tmp3 = 0;
    tb.where({username:app.globalData.username,type:"购物"}).get().then(res=>{
      for(i=0;i<res.data.length;i++) tmp3+=res.data[i].money;
      this.data.payment[3] = tmp3;
    })
    var tmp4 = 0;
    tb.where({username:app.globalData.username,type:"运动"}).get().then(res=>{
      for(i=0;i<res.data.length;i++) tmp4+=res.data[i].money;
      this.data.payment[4] = tmp4;
    })
    var tmp5 = 0;
    tb.where({username:app.globalData.username,type:"交通"}).get().then(res=>{
      for(i=0;i<res.data.length;i++) tmp5+=res.data[i].money;
      this.data.payment[5] = tmp5;
    })
    var tmp6 = 0;
    tb.where({username:app.globalData.username,type:"教育"}).get().then(res=>{
      for(i=0;i<res.data.length;i++) tmp6+=res.data[i].money;
      this.data.payment[6] = tmp6;
    })
    var tmp7 = 0;
    tb.where({username:app.globalData.username,type:"其他"}).get().then(res=>{
      for(i=0;i<res.data.length;i++) tmp7+=res.data[i].money;
      this.data.payment[7] = tmp7;
    })
    var tmp8 = 0;
    tb.where({username:app.globalData.username,type:"转账"}).get().then(res=>{
      for(i=0;i<res.data.length;i++) tmp8+=res.data[i].money;
      this.data.payment[8] = tmp8;
    })
    var tmp9 = 0;
    tb.where({username:app.globalData.username,type:"红包"}).get().then(res=>{
      for(i=0;i<res.data.length;i++) tmp9+=res.data[i].money;
      this.data.payment[9] = tmp9;
    })
    var tmp10 = 0;
    tb.where({username:app.globalData.username,type:"工资"}).get().then(res=>{
      for(i=0;i<res.data.length;i++) tmp10+=res.data[i].money;
      this.data.payment[10] = tmp10;
    })
  },

  onLoad() {
    this.getPayment();
    //获取到组件
    this.Component=this.selectComponent('#mychart-dom')
    this.secComponent=this.selectComponent('#mysecchart-dom')
    // this.thdComponent=this.selectComponent('#mythdchart-dom')

    let _payment = this.data.payment;
    setTimeout(()=>{
      this.setData({
        chartOptionData : {
          outcome :[_payment[0], _payment[1], _payment[2], _payment[3], _payment[4], _payment[5], _payment[6], _payment[7]],
          income :[_payment[8],_payment[9],_payment[10]],
          outcometype:["服务","餐饮","娱乐","购物","运动","交通","教育","其他"],
          incometype:["转账","红包","工资"]
        }
      })
      this.init([_payment[0], _payment[1], _payment[2], _payment[3], _payment[4], _payment[5], _payment[6],_payment[7]],["服务","餐饮","娱乐","购物","运动","交通","教育","其他"])     
      this.init2([_payment[0], _payment[1], _payment[2], _payment[3], _payment[4], _payment[5], _payment[6],_payment[7]],["服务","餐饮","娱乐","购物","运动","交通","教育","其他"])
      // this.init3([_payment[0], _payment[1], _payment[2], _payment[3], _payment[4], _payment[5], _payment[6],_payment[7]],["服务","餐饮","娱乐","购物","运动","交通","教育","其他"])
    },1000)
  },
 
  init(optionData,optionDatatype){//用来手动初始化
    this.Component.init((canvas,width,height,dpr)=>{
      let chart =echarts.init(canvas,null,{
        width: width,
        height: height,
        devicePixelRatio: dpr
      })
      let option =getOption(optionData,optionDatatype)
      chart.setOption(option)
      this.chart=chart//将我们的图表实例绑定到this上，方便我们在其他函数中访问
      return chart
    })
  },
  init2(optionData,optionDatatype){//用来手动初始化
    this.secComponent.init((canvas,width,height,dpr)=>{
      let secchart =echarts.init(canvas,null,{
        width: width,
        height: height,
        devicePixelRatio: dpr
      })
      let option2 =getOption2(optionData,optionDatatype)
      secchart.setOption(option2)
      this.secchart=secchart//将我们的图表实例绑定到this上，方便我们在其他函数中访问
      return secchart
    })
  },
  // init3(optionData,optionDatatype){//用来手动初始化
  //   this.thdComponent.init((canvas,width,height,dpr)=>{
  //     let thdchart =echarts.init(canvas,null,{
  //       width: width,
  //       height: height,
  //       devicePixelRatio: dpr
  //     })
  //     let option3 =getOption3(optionData,optionDatatype)
  //     thdchart.setOption(option3)
  //     this.thdchart=thdchart//将我们的图表实例绑定到this上，方便我们在其他函数中访问
  //     return thdchart
  //   })
  // },

  onReady: function(){this.setData({isReady: true});},
  refreshData: function(){
    this.getPayment();
    let _payment = this.data.payment;
    this.setData({
      chartOptionData : {
        outcome :[_payment[0], _payment[1], _payment[2], _payment[3], _payment[4], _payment[5], _payment[6], _payment[7]],
        income :[_payment[8],_payment[9],_payment[10]],
        outcometype:["服务","餐饮","娱乐","购物","运动","交通","教育","其他"],
        incometype:["转账","红包","工资"]
      }
    })
    if(this.data.type == "income"){
      let option =getOption(this.data.chartOptionData.income,this.data.chartOptionData.incometype);
      let option2 =getOption2(this.data.chartOptionData.income,this.data.chartOptionData.incometype);
      // let option3 =getOption3(this.data.chartOptionData.income,this.data.chartOptionData.incometype);
      this.chart.setOption(option);
      this.secchart.setOption(option2);
      // this.thdchart.setOption(option3);
    }
    else{
      let option =getOption(this.data.chartOptionData.outcome,this.data.chartOptionData.outcometype);
      let option2 =getOption2(this.data.chartOptionData.outcome,this.data.chartOptionData.outcometype);
      // let option3 =getOption3(this.data.chartOptionData.outcome,this.data.chartOptionData.outcometype);
      this.chart.setOption(option);
      this.secchart.setOption(option2);
      // this.thdchart.setOption(option3);
    }
  },

  onShow(){
    if(this.data.isReady)
     setTimeout(() => {
       this.refreshData();
     }, 500); 
    
  },

  changeType(e){//切换效果
    this.setData({type: e.currentTarget.dataset.type});
    if(this.data.type == "income"){
      let option =getOption(this.data.chartOptionData.income,this.data.chartOptionData.incometype);
      let option2 =getOption2(this.data.chartOptionData.income,this.data.chartOptionData.incometype);
      // let option3 =getOption3(this.data.chartOptionData.income,this.data.chartOptionData.incometype);
      this.chart.setOption(option);
      this.secchart.setOption(option2);
      // this.thdchart.setOption(option3);
    }
    else{
      let option =getOption(this.data.chartOptionData.outcome,this.data.chartOptionData.outcometype);
      let option2 =getOption2(this.data.chartOptionData.outcome,this.data.chartOptionData.outcometype);
      // let option3 =getOption3(this.data.chartOptionData.outcome,this.data.chartOptionData.outcometype);
      this.chart.setOption(option);
      this.secchart.setOption(option2);
      // this.thdchart.setOption(option3);
    }
  }
})



function getOption(data,datatype){
  return{
  xAxis: {
    type: 'category',
    data: datatype
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: data,
      type: 'line',
      itemStyle: {
        normal: {
          label: {
            show: true, //开启显示数值
            position: 'top', //数值在上方显示
            textStyle: {  //数值样式
              color: 'green',   //字体颜色
              fontSize: 14  //字体大小
            }
          }
        }
      }
    }
    
  ]
  }
}

function getOption2(data,datatype){
  return{
    xAxis: {
      type: 'category',
      data: datatype
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: data,
        type: 'bar',
        itemStyle: {
          normal: {
            label: {
              show: true, //开启显示数值
              position: 'top', //数值在上方显示
              textStyle: {  //数值样式
                color: 'green',   //字体颜色
                fontSize: 14  //字体大小
              }
            }
          }
        }
      }
    ]
  };
}
// function getOption3(data,datatype){
//   var tmp = new Array(data.length);
  
//   for(var i = 0;i < data.len;i++)
//     tmp[i]={value:data[i],name:datatype[i]};
//   return{
//     title: {
//       text: '构成',
//       left: 'center'
//     },
//     tooltip: {
//      trigger: 'item'
//     },
//     legend: {
//      orient: 'vertical',
//      left: 'left'
//    },
//    series: [
//       {
//         name: 'Access From',
//         type: 'pie',
//         radius: '50%',
//         data: tmp,
//         /*data: [
//           {value:data,name:datatype}
//         ],*/
//         emphasis: {
//           itemStyle: {
//             shadowBlur: 10,
//             shadowOffsetX: 0,
//             shadowColor: 'rgba(0, 0, 0, 0.5)'
//           }
//         }
//       }
//     ] 
//   };
// }


