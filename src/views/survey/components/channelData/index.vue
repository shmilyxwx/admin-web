<template>
  <div>
    <block :info-data="infoData" />
    <chareLine />
  </div>
</template>
<script>
import block from '../block'
import chareLine from '../chareLine'
import { getSurveyStat } from '@/request/api'

export default {
  components: {
    block,
    chareLine
  },
  props: {
    time_start: {
      type: String
    },
    time_end: {
      type: String
    }
  },
  data() {
    return {
      infoData: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    async getData() {
      try {
        const res = await getSurveyStat(
          {
            time_start: this.time_start,
            time_end: this.time_end
          }
        )
        const data = res.data
        this.infoData = [
          {
            title: '注册用户总数',
            count: Number(data.new_user),
            color: '#695ff9'
          },
          {
            title: '活跃用户总数',
            count: Number(data.vip_user),
            color: '#ff9900'
          },
          {
            title: '激活人数',
            count: 100,
            color: '#E46CBB'
          },
          {
            title: '在线时长',
            count: Number(data.dynamics),
            color: '#722ed1'
          },
          {
            title: '留存率',
            icon: 'logo-yen',
            count: Number(data.order),
            color: '#ff5454'
          }
        ]
      } catch (error) {
        this.$Message.error(error.msg || '服务器异常')
      }
    }
  }
}
</script>
