<template>
  <div>
    <div style="width: 100%;height: 800px;border:1px solid rgb(180,180,180)" id="echartss"></div>
  </div>

</template>

<script>
import * as echarts from 'echarts'
import axios from 'axios'
export default {
  name: 'ProductSales',
  mounted: function () {
    console.log(this.echarts1_option.series[0].data[0].name)
    axios.get('/api/product/list', {
    }).then((res) => {
      res = res.data
      console.log(res)
      if (res.code === 0) {
        for (let i = 0; i < 16; i++) {
          this.echarts1_option.legend.data[i] = res.data[i].product.prooductName
          this.echarts1_option.series[0].data[i].value = res.data[i].product.soldNum
          this.echarts1_option.series[0].data[i].name = res.data[i].product.prooductName
          console.log(this.echarts1_option.legend.data[i])
        }
        // this.legend.data[0] = res.data[0].product.productName
      }
    })
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById('echartss'))
    // 绘制图表，this.echarts1_option是数据
    myChart.setOption(this.echarts1_option)
  },
  data () {
    return {
      echarts1_option: {
        backgroundColor: '#45515a',

        title: {
          text: '商品销量占比',
          subtext: '每个商品的总销量占比',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc',
            fontStyle: 'italic'// 标题字体
          }
        },
        // 弹窗，响应鼠标指向，显示具体细节
        tooltip: {
          trigger: 'item', // 以具体项目触发弹窗
          /*
          内容格式器，一共有abcd四个代号，例如在饼图中，{a}指系列，即流量来源，{b}指数据项目，如搜索引擎，{c}指数值，如
          value，{d}百分比。{x}本身代表了相应字符，可以和其他字符拼凑，在弹窗中显示
          */
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        // 图例，选择要显示的项目
        legend: {
          orient: 'vertical',
          left: 'left',
          textStyle: {
            color: '#c8c8d0'
          },
          data: ['奥利奥小饼干', '旺旺华夫饼', '咪咪虾条', '旺旺雪饼', '港荣蒸蛋糕', '虾饺', '乐事薯片', 'GUCCI风衣', '杰克琼斯牛仔裤', 'LV高跟鞋', '华为mate40手机', '华为mateBook', '华为matePad', '苏泊尔高压锅', '南极人棉袜', '超能洗衣粉'] // 注意要和数据的name相对应
        },
        // 工具箱
        toolbox: {
          show: true, // 显示工具箱
          feature: {
            dataView: {show: true}, // 以文字形式显示数据
            restore: {show: true}, // 还原
            // dataZoom:{show:true}, //区域缩放
            saveAsImage: {show: true} // 保存图片
            // magicType:{type:['line','bar']}//动态数据切换，数据显示可以在该规定内容中切换显示方式，
          }
        },
        // 视觉映射组件，将数据映射到视觉元素上
        visualMap: {
          show: false,
          min: 10,
          max: 650,
          dimension: 0, // 选取数据的维度，如人数据：[身高，体重]，则1代表将体重进行映射，默认值为数组的最后一位
          // seriesIndex: 4, //选取数据集合中的哪个数组，如{一班}，{二班}，默认选取data中的所有数据集
          inRange: {
            // 选定了要映射的对象，用inRange详细写要渲染的具体细节，[x，y]中x指最小值对应的量（亮度，饱和度等），y指最大值对应的量，其余的按各自value线性渲染
            color: ['red'],
            colorLightness: [0, 4],
            colorSaturation: [0, 4]
          }
        },
        // 数据
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              {value: '60', name: '奥利奥小饼干'},
              {value: '80', name: '旺旺华夫饼'},
              {value: '66', name: '咪咪虾条'},
              {value: '86', name: '旺旺雪饼'},
              {value: '88', name: '港荣蒸蛋糕'},
              {value: '85', name: '虾饺'},
              {value: '70', name: '乐事薯片'},
              {value: '50', name: 'GUCCI风衣'},
              {value: '53', name: '杰克琼斯牛仔裤'},
              {value: '55', name: 'LV高跟鞋'},
              {value: '45', name: '华为mate40手机'},
              {value: '48', name: '华为mateBook'},
              {value: '55', name: '华为matePad'},
              {value: '53', name: '苏泊尔高压锅'},
              {value: '55', name: '南极人棉袜'},
              {value: '68', name: '超能洗衣粉'}
            ].sort(function (a, b) { return a.value - b.value }),
            roseType: 'radius', // 角度和半径展现百分比，'area'只用半径展现
            label: { // 饼图图形的文本标签
              normal: { // 下同，normal指在普通情况下样式，而非高亮时样式
                textStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              }
            },
            labelLine: { // 引导线样式
              normal: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                },
                smooth: 0.5, // 0-1，越大越平滑弯曲
                length: 10, // 从块到文字的第一段长
                length2: 20 // 拐弯到文字的段长
              }
            },
            itemStyle: { // 图例样式
              normal: {
                color: '#97413c',
                shadowBlur: 50, // 阴影模糊程度
                shadowColor: 'rgba(0, 0, 0, 0.5)'// 阴影颜色，一般黑
              }
            },

            animationType: 'scale', // 初始动画效果，scale是缩放，expansion是展开
            animationEasing: 'elasticOut', // 初始动画缓动效果
            animationDelay: function (idx) { // 数据更新动画时长，idx限定了每个数据块从无到有的速度
              return Math.random() * 200
            }
          }
        ]
      }}
  }
}

</script>

<style scoped>

</style>
