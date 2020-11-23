<!--
 * @Author: fightWz
 * @Date: 2020-04-24 16:18:16
 * @LastEditors: fightWz
 * @LastEditTime: 2020-08-10 17:42:53
 * @Description: 概况
 -->
<template>
  <div ref="page" class="wrap monitor">
    <div class="tab">
      <div style="flex:1">
        <RadioGroup v-model="typeIndex" type="button" @on-change="typeChange">
          <Radio v-for="(tab, index) in tabTypes" :key="index" :label="index">{{ tab.title }}</Radio>
        </RadioGroup>
      </div>
      <div slot="extra" class="search">
        <DatePicker v-model="time_start" type="date" placeholder="选择开始日期" :options="startOptions" :clearable="false" style="width: 200px" @on-change="(e) => changeValue('time_start', e)" />
        <span style="margin: 0 10px">至</span>
        <DatePicker v-model="time_end" type="date" placeholder="选择截止日期" :options="endOptions" :clearable="false" style="width: 200px" @on-change="(e) => changeValue('time_end', e)" />
        <Button type="primary" style="margin-left:20px" @click="handleFilter">查询</Button>
      </div>
    </div>
    <components :is="isComponent" v-if="showComponents" ref="view" />
  </div>
</template>
<script>
import userData from './components/userData'
import squareData from './components/squareData'
import rechargeData from './components/rechargeData'
import channelData from './components/channelData'
const nowDate = new Date()
export default {
  components: {
    userData,
    squareData,
    rechargeData,
    channelData
  },
  data() {
    return {
      time_start: this.$fmtMoment(new Date().setTime(nowDate.getTime() - 3600 * 1000 * 24 * 7), 'YYYY-MM-DD'),
      time_end: this.$fmtMoment(nowDate.getTime() - 3600 * 1000 * 24 * 1, 'YYYY-MM-DD'),
      // "用户在线统计"
      tabTypes: [
        {
          title: '用户数据',
          value: 'userData'
        },
        {
          title: '广场数据',
          value: 'squareData'
        },
        {
          title: '充值消费数据',
          value: 'rechargeData'
        }
      ],
      typeIndex: 0,
      isComponent: 'userData',
      showComponents: true
    }
  },
  computed: {
    time_start_send() {
      return this.$fmtMoment(this.time_start, 'YYYY-MM-DD')
    },
    time_end_send() {
      return this.$fmtMoment(this.time_end, 'YYYY-MM-DD')
    },
    startOptions() {
      return {
        disabledDate: (date) => {
          return date && (date.valueOf() > Date.now() - 86400000 || date.valueOf() < new Date(this.time_end) - 86400000 * 60 || date.valueOf() > new Date(this.time_end))
        }
      }
    },
    endOptions() {
      return {
        disabledDate: (date) => {
          return date && (date.valueOf() > Date.now() || date.valueOf() < new Date(this.time_start))
        }
      }
    }
  },
  mounted() {
    this.$refs.view.getData({
      time_start: this.time_start_send,
      time_end: this.time_end_send
    })
  },
  methods: {
    typeChange(index) {
      this.isComponent = this.tabTypes[index].value
      setTimeout(() => {
        this.$refs.view.getData({
          time_start: this.time_start_send,
          time_end: this.time_end_send
        })
      }, 100)
    },
    // 搜索
    handleFilter() {
      this.$refs.view.getData({
        time_start: this.time_start_send,
        time_end: this.time_end_send
      })
    },
    // 修改值
    changeValue(key, value) {
      if (value) {
        this[key] = value
      }
    }
  }
}
</script>

<style lang="less">
.monitor {
  overflow: hidden;
  .count-style {
    font-size: 30px;
  }
  .tab {
    margin: 20px 0;
    display: flex;
    align-items: center;
  }
}
</style>
