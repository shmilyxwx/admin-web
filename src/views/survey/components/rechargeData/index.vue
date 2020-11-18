<template>
  <div>
    <!-- 提现看板 -->
    <div class="lookBoard">
      <span class="lookBoard_item">充值看板</span>
    </div>
    <block :info-data="infoData" @userSelect="userSelect" />
    <chareLine :ve-data="veData" />
    <!-- 提现看板 -->
    <div class="lookBoard">
      <span class="lookBoard_item">提现看板</span>
    </div>
    <block :info-data="withdrawInfoData" @userSelect="withdrawSelect" />
    <chareLine :ve-data="withdrawVeData" />
    <!-- 提现饼状图 -->
    <ve-pie :data="waychartData" />
    <!-- 消费行为看板 -->
    <div class="lookBoard">
      <span class="lookBoard_item">消费行为看板</span>
    </div>
    <block :info-data="costInfoData" />
    <chareLine :ve-data="costVeData" />
    <!-- 消费类别饼状图 -->
    <ve-pie :data="costchartData" :events="chartEvents" />
    <Modal v-model="modal" width="1000px" :title="modalTitle" @on-cancel="modal=false">
      <wz-table ref="table" :columns="columns" :data-api="dataApi" />
    </Modal>
  </div>
</template>
<script>
import block from '../block'
import chareLine from '../chareLine'
import { getOrderLanghua, getWithdrawal, getPayLanghua, getRedPhoto, getRedSocial, getRedUserActivity, getRedUserDynamic } from '@/request/api'
import columns from './mixins/columns'
const withdrawalType = {
  1: '提现浪花',
  2: '提现余额'
}
const pay_type = {
  1: '动态发布',
  2: '查看社交账号',
  3: '私聊',
  4: '红包相册',
  5: '红包图片',
  6: '红包相册视频',
  7: '活动'
}
export default {
  components: {
    block,
    chareLine
  },

  mixins: [columns],
  data() {
    this.chartEvents = {
      click: (e) => {
        this.key = this.findKey(pay_type, e.name)
        this.modalTitle = pay_type[this.key]
        let income_type
        let type
        if (this.key === '5' || this.key === '6') {
          this.dataApi = getRedPhoto
          income_type = this.key === '5' ? '1' : '2'
        } else if (this.key === '3' || this.key === '2') {
          this.dataApi = getRedSocial
          type = this.key === '3' ? 'user_chat' : 'user_wechat'
        } else if (this.key === '1') {
          this.dataApi = getRedUserDynamic
        } else if (this.key === '7') {
          this.dataApi = getRedUserActivity
        } else if (this.key === '4') {
          income_type = '4'
        }
        setTimeout(() => {
          this.modal = true
          this.$refs['table'].getData({ ...this.apiParams, income_type, type })
        }, 100)
      }
    }
    return {
      timeStart: this.time_start,
      timeEnd: this.time_end,
      // 充值看板
      infoData: [],
      veData: {
        columns: ['日期', '充值浪花总次数'],
        rows: []
      },
      rechargeData: '',
      // 提现看板
      withdrawInfoData: [],
      withdrawData: '',
      withdrawVeData: {
        columns: ['日期', '提现浪花'],
        rows: []
      },
      waychartData: {
        columns: ['日期', '充值方式'],
        rows: []
      },
      // 消费行为看板
      costInfoData: [],
      costData: '',
      costVeData: {
        columns: ['日期', '消费浪花'],
        rows: []
      },
      costchartData: {
        columns: ['日期', '充值方式'],
        rows: []
      },
      // 消费明细tanc
      modal: false,
      modalTitle: '',
      dataApi: getRedPhoto,
      apiParams: {
        time_start: this.time_start,
        time_end: this.time_end
      },
      key: ''// 请求类型
    }
  },

  methods: {
    async getData(params = {}) {
      try {
        // 充值统计
        const res = await getOrderLanghua({ ...params })
        this.rechargeData = res.data
        this.infoData = [
          { title: '充值浪花总次数', count: Number(this.rechargeData.total_num) },
          { title: '充值浪花总金额', count: Number(this.rechargeData.total_money) }
        ]
        this.veData.rows = []
        for (const key in this.rechargeData.data.num) {
          this.veData.rows.push({ '日期': key, '充值浪花总次数': this.rechargeData.data.num[key] })
        }
        // 提现统计
        const withdrawData = await getWithdrawal({ ...params })
        this.withdrawData = withdrawData.data
        console.log(this.withdrawData, 9999)
        this.withdrawInfoData = [
          { title: '提现浪花人数', count: Number(this.withdrawData.total_coin_user_num) },
          { title: '提现浪花', count: Number(this.withdrawData.total_coin) },
          { title: '提现金额人数', count: Number(this.withdrawData.total_money_user_num) },
          { title: '提现金额', count: Number(this.withdrawData.total_money) }
        ]
        this.withdrawVeData.rows = []
        for (const key in this.withdrawData.data.coin) {
          this.withdrawVeData.rows.push({ '日期': key, '提现浪花': this.withdrawData.data.coin[key] })
        }
        this.waychartData.rows = []
        for (const key in this.withdrawData.data.kind) {
          this.waychartData.rows.push({ '日期': withdrawalType[key], '充值方式': this.withdrawData.data.kind[key] })
        }
        // 消费统计
        const costData = await getPayLanghua({ ...params })
        this.costData = costData.data
        this.costInfoData = [
          { title: '消费浪花', count: Number(this.costData.total_user_pay) }
        ]
        this.costVeData.rows = []
        for (const key in this.costData.data.user_pay) {
          this.costVeData.rows.push({ '日期': key, '消费浪花': this.costData.data.user_pay[key] })
        }
        this.costchartData.rows = []
        for (const key in this.costData.data.pay_type) {
          this.costchartData.rows.push({ '日期': pay_type[key], '充值方式': this.costData.data.pay_type[key] })
        }
      } catch (error) {
        this.$Message.error(error.msg || '服务器异常')
      }
    },
    userSelect(index) {
      if (index === 0) {
        this.veData.rows = []
        this.veData.columns = ['日期', '充值浪花总次数']
        for (const key in this.rechargeData.data.num) {
          this.veData.rows.push({ '日期': key, '充值浪花总次数': this.rechargeData.data.num[key] })
        }
      } else if (index === 1) {
        this.veData.rows = []
        this.veData.columns = ['日期', '充值浪花总金额']
        for (const key in this.rechargeData.data.money) {
          this.veData.rows.push({ '日期': key, '充值浪花总金额': this.rechargeData.data.money[key] })
        }
      }
    },
    withdrawSelect(index) {
      if (index === 0) {
        this.withdrawVeData.rows = []
        this.withdrawVeData.columns = ['日期', '提现浪花人数']
        for (const key in this.withdrawData.data.coin_user_num) {
          this.withdrawVeData.rows.push({ '日期': key, '提现浪花人数': this.withdrawData.data.coin_user_num[key] })
        }
      } else if (index === 1) {
        this.withdrawVeData.rows = []
        this.withdrawVeData.columns = ['日期', '提现浪花']
        for (const key in this.withdrawData.data.coin) {
          this.withdrawVeData.rows.push({ '日期': key, '提现浪花': this.withdrawData.data.coin[key] })
        }
      } else if (index === 2) {
        this.withdrawVeData.rows = []
        this.withdrawVeData.columns = ['日期', '提现金额人数']
        for (const key in this.withdrawData.data.money_user_num) {
          this.withdrawVeData.rows.push({ '日期': key, '提现金额人数': this.withdrawData.data.money_user_num[key] })
        }
      } else if (index === 3) {
        this.withdrawVeData.rows = []
        this.withdrawVeData.columns = ['日期', '提现金额']
        for (const key in this.withdrawData.data.money) {
          this.withdrawVeData.rows.push({ '日期': key, '提现金额': this.withdrawData.data.money[key] })
        }
      }
    },
    findKey(obj, value, compare = (a, b) => a === b) {
      return Object.keys(obj).find(k => compare(obj[k], value))
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
