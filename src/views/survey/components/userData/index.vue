<template>
  <div>
    <div class="lookBoard">
      <span class="lookBoard_item">用户看板</span>
      <Select v-model="channelModel" clearable style="width:200px">
        <Option v-for="item in channeOption" :key="item.value" :value="item.value">{{ item.label }}</Option>
      </Select>
    </div>
    <block :info-data="infoData" @userSelect="userSelect" />
    <chareLine :ve-data="veData" />
    <div class="lookBoard">
      <span class="lookBoard_item">会员看板</span>
    </div>
    <block :info-data="vipInfoData" @userSelect="VipSelect" />
    <chareLine :ve-data="vipvEData" />
    <div class="circle">
      <div class="circleItem">
        <span class="lookBoard_item">充值档位</span>
        <ve-pie width="100%" :data="chartData" />
      </div>
      <div class="circleItem">
        <span class="lookBoard_item">充值方式</span>
        <ve-pie width="100%" :data="waychartData" />
      </div>
    </div>
  </div>
</template>
<script>
import block from '../block'
import chareLine from '../chareLine'
import { getUserStatistics, getVipStatistics } from '@/request/api'
const type = {
  alipay: '支付宝充值',
  coin: '充值浪花',
  wechat: '微信充值'
}
export default {
  components: {
    block,
    chareLine
  },
  data() {
    return {
      infoData: [],
      vipInfoData: [],
      channelModel: 0,
      channeOption: [
        {
          value: 0,
          label: '全部渠道'
        },
        {
          value: 'langya',
          label: '官网'
        },
        {
          value: 'huawei',
          label: '华为'
        },
        {
          value: 'yinyongbao',
          label: '应用宝'
        },
        {
          value: '_360',
          label: '360'
        },
        {
          value: 'meizhu',
          label: '魅族'
        },
        {
          value: 'baidu',
          label: '百度'
        },
        {
          value: 'vivo',
          label: 'VIVO'
        },
        {
          value: 'oppo',
          label: 'OPPO'
        },
        {
          value: 'xiaomi',
          label: '小米'
        },
        {
          value: 'sougou',
          label: '搜狗'
        },
        {
          value: 'cmcc',
          label: '中国移动'
        },
        {
          value: 'alibaba',
          label: '阿里应用分发'
        },
        {
          value: 'appstore',
          label: '苹果商店'
        }
      ],
      veData: {
        columns: ['日期', '注册用户总数'],
        rows: []
      },
      vipvEData: {
        columns: ['日期', '新增会员数'],
        rows: []
      },
      userData: '',
      vipData: '',
      chartData: {
        columns: ['日期', '充值档位'],
        rows: []
      },
      waychartData: {
        columns: ['日期', '充值方式'],
        rows: []
      },
      showCircle: false
    }
  },
  methods: {
    async getData(params = {}) {
      this.showCircle = false
      try {
        const sendParams = {
          ...params,
          channel: this.channelModel
        }
        if (!this.channelModel) {
          delete sendParams['channel']
        }
        const res = await getUserStatistics(
          {
            ...sendParams
          }
        )
        const data = res.data
        this.userData = data
        this.infoData = [
          { title: '注册用户总数', count: Number(data.new_user) },
          { title: '活跃用户总数', count: Number(data.active) },
          { title: '登录总人数', count: Number(data.login_num) }
        ]
        this.veData.rows = []
        for (const key in data.data_users) {
          this.veData.rows.push({ '日期': key, '注册用户总数': data.data_users[key] })
        }
        const vipRes = await getVipStatistics({
          ...params
        })
        const vipData = vipRes.data
        this.vipData = vipData
        this.vipInfoData = [
          { title: '新增会员数', count: Number(vipData.total_new_num) },
          { title: '安卓端充值次数', count: Number(vipData.total_money_num) },
          { title: '充值金额', count: Number(vipData.total_money_pay) },
          { title: 'iOS端充值次数', count: Number(vipData.total_coin_num) },
          { title: '充值浪花', count: Number(vipData.total_coin_pay) }
        ]
        this.vipvEData.rows = []
        for (const key in vipData.data.new_num) {
          this.vipvEData.rows.push({ '日期': key, '新增会员数': vipData.data.new_num[key] })
        }
        this.chartData.rows = []
        for (const key in vipData.data.period) {
          this.chartData.rows.push({ '日期': key + '天', '充值档位': vipData.data.period[key] })
        }
        this.waychartData.rows = []
        for (const key in vipData.data.pay_type) {
          this.waychartData.rows.push({ '日期': type[key], '充值方式': vipData.data.pay_type[key] })
        }
        this.showCircle = true
      } catch (error) {
        this.$Message.error(error.msg || '服务器异常')
      }
    },
    userSelect(index) {
      if (index === 0) {
        this.veData.rows = []
        this.veData.columns = ['日期', '注册用户总数']
        for (const key in this.userData.data_users) {
          this.veData.rows.push({ '日期': key, '注册用户总数': this.userData.data_users[key] })
        }
      } else if (index === 1) {
        this.veData.rows = []
        this.veData.columns = ['日期', '活跃用户总数']
        for (const key in this.userData.data_active) {
          this.veData.rows.push({ '日期': key, '活跃用户总数': this.userData.data_active[key] })
        }
      } else {
        this.veData.rows = []
        this.veData.columns = ['日期', '登录总人数']
        for (const key in this.userData.data_login) {
          this.veData.rows.push({ '日期': key, '登录总人数': this.userData.data_login[key] })
        }
      }
    },
    VipSelect(index) {
      if (index === 0) {
        this.vipvEData.rows = []
        this.vipvEData.columns = ['日期', '新增会员数']
        for (const key in this.vipData.data.new_num) {
          this.vipvEData.rows.push({ '日期': key, '新增会员数': this.vipData.data.new_num[key] })
        }
      } else if (index === 4) {
        this.vipvEData.rows = []
        this.vipvEData.columns = ['日期', '充值浪花']
        for (const key in this.vipData.data.vip_coin_pay) {
          this.vipvEData.rows.push({ '日期': key, '充值浪花': this.vipData.data.vip_coin_pay[key] })
        }
      } else if (index === 2) {
        this.vipvEData.rows = []
        this.vipvEData.columns = ['日期', '充值金额']
        for (const key in this.vipData.data.vip_money_pay) {
          this.vipvEData.rows.push({ '日期': key, '充值金额': this.vipData.data.vip_money_pay[key] })
        }
      } else if (index === 3) {
        this.vipvEData.rows = []
        this.vipvEData.columns = ['日期', 'iOS端充值次数']
        for (const key in this.vipData.data.vip_coin_num) {
          this.vipvEData.rows.push({ '日期': key, 'iOS端充值次数': this.vipData.data.vip_coin_num[key] })
        }
      } else if (index === 1) {
        this.vipvEData.rows = []
        this.vipvEData.columns = ['日期', '安卓端充值次数']
        for (const key in this.vipData.data.vip_money_num) {
          this.vipvEData.rows.push({ '日期': key, '安卓端充值次数': this.vipData.data.vip_money_num[key] })
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
}
.lookBoard_item {
  font-size: 18px;
}
.circle {
  display: flex;
  .circleItem {
    text-align: center;
    width: 50%;
  }
}
</style>
