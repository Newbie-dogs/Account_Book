// pages/statistics/statistics.js
import * as echarts from '../../ec-canvas/echarts';

let chart = null;

Page({
  data: {
    ec: {
      onInit: initChart
    }
  }
})

// 初始化图表函数
function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  })

  canvas.setChart(chart)

  // 显示Echarts图表类型信息，可以去Echarts官网复制粘贴
  let option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }]
  }

  chart.setOption(option);
  return chart;
}
