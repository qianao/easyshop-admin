<template>
  <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div id="chartLine" class="line-wrap"></div>
</template>

<script>
import * as echarts from 'echarts'
import {_countOrderItemByProductIdAndDate, _getAllnames} from '../../../../api/orderItem'
require('echarts/theme/shine')// 引入主题

export default {
  data () {
    return {
      chartLine: null,
      temp: 124,
      names: []
    }
  },
  mounted () {
    this.drawLineChart()
  },
  methods: {
    getdate () {
      var date = new Date()
      var seperator1 = '-'
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()

      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate
      return currentdate
    },
    getBeforeDate (num, time) {
      let n = num
      let d = ''
      if (time) {
        d = new Date(time)
      } else {
        d = new Date()
      }
      let year = d.getFullYear()
      let mon = d.getMonth() + 1
      let day = d.getDate()
      if (day <= n) {
        if (mon > 1) {
          mon = mon - 1
        } else {
          year = year - 1
          mon = 12
        }
      }
      d.setDate(d.getDate() - n)
      year = d.getFullYear()
      mon = d.getMonth() + 1
      day = d.getDate()
      let s = year + '-' + (mon < 10 ? ('0' + mon) : mon) + '-' + (day < 10 ? ('0' + day) : day)
      // console.log(s)
      return s
    },
    getSoldNumber (id, date) {
      var thisa = this
      _countOrderItemByProductIdAndDate(id, date).then((res) => {
        // console.log(res.data)
        thisa.temp = 10
      })
      console.log(this.temp)
      return this.temp
    },
    drawLineChart () {
      let recordDays = 10
      let showNum = 3
      let dates = []
      let datePromis = []
      for (var i = 0; i < recordDays; i++) {
        dates[i] = this.getBeforeDate(recordDays - i, this.getdate())
      }
      dates.forEach((item) => {
        datePromis.push(_countOrderItemByProductIdAndDate(1, item))
        // datePromis.push(_countOrderItemByProductIdAndDate(4, item))
        // datePromis.push(_countOrderItemByProductIdAndDate(5, item))
      })
      dates.forEach((item) => {
        datePromis.push(_countOrderItemByProductIdAndDate(2, item))
        // datePromis.push(_countOrderItemByProductIdAndDate(4, item))
        // datePromis.push(_countOrderItemByProductIdAndDate(5, item))
      })
      dates.forEach((item) => {
        datePromis.push(_countOrderItemByProductIdAndDate(3, item))
        // datePromis.push(_countOrderItemByProductIdAndDate(4, item))
        // datePromis.push(_countOrderItemByProductIdAndDate(5, item))
      })
      datePromis.push(_getAllnames())
      Promise.all(datePromis).then(res => {
        console.log(res)
        var a1 = res.splice(0, recordDays)
        var a2 = res.splice(0, recordDays)
        var a3 = res.splice(0, recordDays)
        a1[0] = a1[0].data
        a2[0] = a2[0].data
        a3[0] = a3[0].data
        for (var i = 1; i < recordDays; i++) {
          a1[i] = a1[i].data + a1[i - 1]
          a2[i] = a2[i].data + a2[i - 1]
          a3[i] = a3[i].data + a3[i - 1]
        }
        console.log(a1)
        console.log(a2)
        console.log(a3)
        // console.log(res.slice(14, 21))
        this.chartLine = echarts.init(this.$el, 'shine')// 基于准备好的dom，初始化echarts实例
        let option = {
          tooltip: {
            trigger: 'axis',
            textStyle: {
              fontSize: 18,
              color: 'white'
            }
          },
          legend: {
            data: res[showNum * 7]
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              axisTick: {
                show: false
              },
              data: dates
            }
          ],
          yAxis: [
            {
              type: 'value',
              axisTick: {
                show: false
              },
              name: '（销量）'
            }
          ],
          series: [
            {
              name: res[0][0],
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: a1
            },
            {
              name: res[0][1],
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: a2
            },
            {
              name: res[0][2],
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: a3
            }
          ]
        }
        // 使用刚指定的配置项和数据显示图表
        this.chartLine.setOption(option)
      })
    }
  }

}
</script>

<style lang='less' scope>
  .line-wrap{
    width:80%;
    height:500px;
  }

</style>
