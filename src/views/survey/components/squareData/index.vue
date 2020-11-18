<template>
  <div>
    <div class="lookBoard">
      <span class="lookBoard_item">广场看板</span>
    </div>
    <block :info-data="infoData" @userSelect="userSelect" />
    <chareLine :ve-data="veData" />
  </div>
</template>
<script>
import block from '../block'
import chareLine from '../chareLine'
import { getSquare } from '@/request/api'

export default {
  components: {
    block,
    chareLine
  },
  data() {
    return {
      infoData: [],
      veData: {
        columns: ['日期', '发布动态数'],
        rows: []
      },
      userData: ''
    }
  },

  methods: {
    async getData(params = {}) {
      try {
        const res = await getSquare(
          {
            ...params
          }
        )
        const data = res.data
        this.userData = data
        this.infoData = [
          {
            title: '发布动态数',
            count: Number(data.total_dynamics)
          },
          {
            title: '发布活动数',
            count: Number(data.total_activity)
          },
          {
            title: '动态评论数',
            count: Number(data.total_comment)
          },
          {
            title: '动态点赞数',
            count: Number(data.total_praise)
          },
          {
            title: '活动报名数',
            count: Number(data.total_activity_apply_log)
          }
        ]
        this.veData.rows = []
        for (const key in data.data.dynamics) {
          this.veData.rows.push({
            '日期': key,
            '发布动态数': data.data.dynamics[key]
          })
        }
      } catch (error) {
        this.$Message.error(error.msg || '服务器异常')
      }
    },
    userSelect(index) {
      if (index === 0) {
        this.veData.rows = []
        this.veData.columns = ['日期', '发布动态数']
        for (const key in this.userData.data.dynamics) {
          this.veData.rows.push({ '日期': key, '发布动态数': this.userData.data.dynamics[key] })
        }
      } else if (index === 1) {
        this.veData.rows = []
        this.veData.columns = ['日期', '发布活动数']
        for (const key in this.userData.data.activity) {
          this.veData.rows.push({ '日期': key, '发布活动数': this.userData.data.activity[key] })
        }
      } else if (index === 2) {
        this.veData.rows = []
        this.veData.columns = ['日期', '动态评论数']
        for (const key in this.userData.data.comment) {
          this.veData.rows.push({ '日期': key, '动态评论数': this.userData.data.comment[key] })
        }
      } else if (index === 3) {
        this.veData.rows = []
        this.veData.columns = ['日期', '动态点赞数']
        for (const key in this.userData.data.praise) {
          this.veData.rows.push({ '日期': key, '动态点赞数': this.userData.data.praise[key] })
        }
      } else if (index === 4) {
        this.veData.rows = []
        this.veData.columns = ['日期', '活动报名数']
        for (const key in this.userData.data.activity_apply_log) {
          this.veData.rows.push({ '日期': key, '活动报名数': this.userData.data.activity_apply_log[key] })
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.lookBoard {
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
  .lookBoard_item {
    font-size: 18px;
  }
}
</style>
