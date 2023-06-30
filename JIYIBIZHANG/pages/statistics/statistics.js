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
    daypayment:[7],
    dayincome:[7],
    daylist:[7]
  },
  check: function(a,b){
    if(a.getFullYear()!=b.getFullYear()) return false;
    if(a.getMonth()!=b.getMonth()) return false;
    if(a.getDate()!=b.getDate()) return false;return true;
  },
  getLaterPayment: function(){
    tb.where({username:app.globalData.username}).orderBy("date","desc").get().then(res=>{
      // console.log(res.data);
      var _nowtime = new Date();
      var nowtime = new Date(_nowtime.getFullYear(),_nowtime.getMonth(),_nowtime.getDate(),8);
      var i,j=0;
      for(i=0;i<7;i++){
        this.data.daypayment[i]=0;
        this.data.dayincome[i]=0;
      }
      for(i = 6;i>=0;i--){
        while(j<res.data.length){
          _nowtime = new Date(res.data[j].date);
          // if(function(nowtime,_nowtime){
          //   if(nowtime.getFullYear()!=_nowtime.getFullYear()) return false;
          //   if(nowtime.getMonth()!=_nowtime.getMonth()) return false;
          //   if(nowtime.getDate()!=_nowtime.getDate()) return false;return true;
          // })
          if(this.check(nowtime,_nowtime))
            if(res.data[j].is_payment) this.data.daypayment[i]+=res.data[j].money;
            else this.data.dayincome[i]+=res.data[j].money;
          else break;
          j++;
        }
        this.data.daylist[i] = Number(nowtime.getMonth()+1).toString()+"."+nowtime.getDate().toString();
        nowtime = new Date(nowtime-86400000);
      }
    }).catch(err=>{console.log(err,"getLaterPayment Failed!")})
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
    this.getLaterPayment();
    //获取到组件
    this.Component=this.selectComponent('#mychart-dom')
    this.secComponent=this.selectComponent('#mysecchart-dom')
    // this.thdComponent=this.selectComponent('#mythdchart-dom')

    let _payment = this.data.payment;
    let _daypayment = this.data.daypayment;
    let _daylist = this.data.daylist;
    setTimeout(()=>{
      this.setData({
        chartOptionData : {
          outcome :[_payment[0], _payment[1], _payment[2], _payment[3], _payment[4], _payment[5], _payment[6], _payment[7]],
          income :[_payment[8],_payment[9],_payment[10]],
          outcometype:["服务","餐饮","娱乐","购物","运动","交通","教育","其他"],
          incometype:["转账","红包","工资"]
        }
      })
      // this.init([_payment[0], _payment[1], _payment[2], _payment[3], _payment[4], _payment[5], _payment[6],_payment[7]],["服务","餐饮","娱乐","购物","运动","交通","教育","其他"])
      this.init([_daypayment[0], _daypayment[1], _daypayment[2], _daypayment[3], _daypayment[4], _daypayment[5], _daypayment[6]],[_daylist[0], _daylist[1], _daylist[2], _daylist[3], _daylist[4], _daylist[5], _daylist[6]])
      this.init2([_payment[0], _payment[1], _payment[2], _payment[3], _payment[4], _payment[5], _payment[6],_payment[7]],["服务","餐饮","娱乐","购物","运动","交通","教育","其他"])
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

  onReady: function(){this.setData({isReady: true});},
  refreshData: function(){
    this.getPayment();
    this.getLaterPayment();
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
      let option =getOption(this.data.dayincome,this.data.daylist);
      let option2 =getOption2(this.data.chartOptionData.income,this.data.chartOptionData.incometype);
      // let option3 =getOption3(this.data.chartOptionData.income,this.data.chartOptionData.incometype);
      this.chart.setOption(option);
      this.secchart.setOption(option2);
      // this.thdchart.setOption(option3);
    }
    else{
      let option =getOption(this.data.daypayment,this.data.daylist);
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
    
     this.getLaterPayment();
  },

  changeType(e){//切换效果
    this.setData({type: e.currentTarget.dataset.type});
    if(this.data.type == "income"){
      let option =getOption(this.data.dayincome,this.data.daylist);
      let option2 =getOption2(this.data.chartOptionData.income,this.data.chartOptionData.incometype);
      // let option3 =getOption3(this.data.chartOptionData.income,this.data.chartOptionData.incometype);
      this.chart.setOption(option);
      this.secchart.setOption(option2);
      // this.thdchart.setOption(option3);
    }
    else{
      let option =getOption(this.data.daypayment,this.data.daylist);
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


