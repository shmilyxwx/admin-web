<!--
 * @Author: fightWz
 * @Date: 2020-09-04 14:29:34
 * @LastEditors: fightWz
 * @LastEditTime: 2020-09-16 17:39:10
 * @FilePath: \langya-admin\src\views\userManagement\worktop\index.vue
 * @Description:工作台
-->
<template>
  <div class="wrap worktop">
    <Row style="margin-bottom:14px">
      <Card style="width:100%" title :bordered="false" :padding="0">
        <div class="card-title" slot="title">
          <h2>概况</h2>
          <div class="search-input">
            <DatePicker type="date" v-model="time_start" placeholder="选择开始日期" :options="startOptions" :clearable="false" @on-change="(e) => changeValue('time_start', e)" style="width: 200px"></DatePicker>
            <span style="margin: 0 10px">至</span>
            <DatePicker type="date" v-model="time_end" placeholder="选择截止日期" :options="endOptions" :clearable="false" @on-change="(e) => changeValue('time_end', e)" style="width: 200px"></DatePicker>
            <Button type="primary" @click="handleFilterTotal" style="margin-left:20px">查询</Button>
          </div>
        </div>
      </Card>
    </Row>
    <Row :gutter="16">
      <Col span="18">
      <Row>
        <Card style="width:100%" title :bordered="false">
          <div class="dataInfo" v-if="detailData">
            <div class="dataInfo-item">
              <div class="dataInfo-item-info">
                <p class="title">动态总数</p>
                <count-up style="margin-top:10px" :end="detailData.dynamics.num" count-class="count-number" usegroup>
                </count-up>
              </div>
              <div class="dataInfo-item-info">
                <Row>
                  <span class="subTitle">真实:</span>
                  <count-up style="display:inline-block;margin:0 15px; font-size: 12px;" :end="Number(detailData.dynamics.real_user)" count-class="sub-count-number" usegroup>
                  </count-up>
                </Row>
                <Row>
                  <span class="subTitle">虚拟:</span>
                  <count-up style="display:inline-block;margin:0 15px;font-size: 12px;" :end="Number(detailData.dynamics.virtual_user)" count-class="sub-count-number" usegroup>
                  </count-up>
                </Row>
              </div>
            </div>
            <div class="dataInfo-item">
              <div class="dataInfo-item-info">
                <p class="title">评论总数</p>
                <count-up style="margin-top:10px" :end="detailData.comment.num" count-class="count-number" usegroup>
                </count-up>
              </div>
              <div class="dataInfo-item-info">
                <Row>
                  <span class="subTitle">真实:</span>
                  <count-up style="display:inline-block;margin:0 15px; font-size: 12px;" :end="Number(detailData.comment.real_user)" count-class="sub-count-number" usegroup>
                  </count-up>
                </Row>
                <Row>
                  <span class="subTitle">虚拟:</span>
                  <count-up style="display:inline-block;margin:0 15px;font-size: 12px;" :end="Number(detailData.comment.virtual_user)" count-class="sub-count-number" usegroup>
                  </count-up>
                </Row>
              </div>
            </div>
            <div class="dataInfo-item">
              <div class="dataInfo-item-info">
                <p class="title">活动总数</p>
                <count-up style="margin-top:10px" :end="detailData.activity.num" count-class="count-number" usegroup>
                </count-up>
              </div>
              <div class="dataInfo-item-info">
                <Row>
                  <span class="subTitle">真实:</span>
                  <count-up style="display:inline-block;margin:0 15px; font-size: 12px;" :end="Number(detailData.activity.real_user)" count-class="sub-count-number" usegroup>
                  </count-up>
                </Row>
                <Row>
                  <span class="subTitle">虚拟:</span>
                  <count-up style="display:inline-block;margin:0 15px;font-size: 12px;" :end="Number(detailData.activity.virtual_user)" count-class="sub-count-number" usegroup>
                  </count-up>
                </Row>
              </div>
            </div>
            <div class="dataInfo-item">
              <div class="dataInfo-item-info">
                <p class="title">活动报名总数</p>
                <count-up style="margin-top:10px" :end="detailData.activity_apply_log.num" count-class="count-number" usegroup>
                </count-up>
              </div>
              <div class="dataInfo-item-info">
                <Row>
                  <span class="subTitle">真实:</span>
                  <count-up style="display:inline-block;margin:0 15px; font-size: 12px;" :end="Number(detailData.activity_apply_log.real_user)" count-class="sub-count-number" usegroup>
                  </count-up>
                </Row>
                <Row>
                  <span class="subTitle">虚拟:</span>
                  <count-up style="display:inline-block;margin:0 15px;font-size: 12px;" :end="Number(detailData.activity_apply_log.virtual_user)" count-class="sub-count-number" usegroup>
                  </count-up>
                </Row>
              </div>
            </div>
            <div class="dataInfo-item">
              <div class="dataInfo-item-info">
                <p class="title">点赞总数</p>
                <count-up style="margin-top:10px" :end="detailData.praise.num" count-class="count-number" usegroup>
                </count-up>
              </div>
              <div class="dataInfo-item-info">
                <Row>
                  <span class="subTitle">真实:</span>
                  <count-up style="display:inline-block;margin:0 15px; font-size: 12px;" :end="Number(detailData.praise.real_user)" count-class="sub-count-number" usegroup>
                  </count-up>
                </Row>
                <Row>
                  <span class="subTitle">虚拟:</span>
                  <count-up style="display:inline-block;margin:0 15px;font-size: 12px;" :end="Number(detailData.praise.virtual_user)" count-class="sub-count-number" usegroup>
                  </count-up>
                </Row>
              </div>
            </div>
          </div>
          <Tabs type="card" v-model="tabValue" @on-click="tabClick">
            <TabPane name="getContentDynamic" label="动态"></TabPane>
            <TabPane name="getContentComment" label="评论"></TabPane>
            <TabPane name="getContentActivity" label="活动"></TabPane>
            <TabPane name="getContentActivityApplyLog" label="活动报名"></TabPane>
            <TabPane name="getContentPraise" label="点赞总数"></TabPane>
          </Tabs>
          <ve-line :data="veData1" :toolbox="toolbox" :data-zoom="dataZoom" :extend="extend" ref="chart1" width="100%" height="600px" :data-empty="dataEmpty" :colors="colors" :resize-delay="500"></ve-line>
        </Card>
      </Row>
      </Col>
      <Col span="6">
      <Card style="width:100%" :bordered="false">
        <div class="card-title" slot="title">
          <h2>热门动态</h2>
        </div>
        <div class="card-title">
          <ul class="card-list">
            <li :class="{top: index < 3}" v-for="(item, index) in HotDynamic" :key="index">
              <div class="personal-img">
                <span class="index">{{index+1}}</span>
                <img :src="(item['user'] && item['user']['avatar']) | avatar" />
              </div>
              <h2 class="personal-content">
                <p> {{item['user'] && item['user']['nickname']}}</p>
                <span class="contetn" v-if="item['content']">{{item.content.length>36?item.content.slice(0,32)+'...':item.content}}</span>
                <div class="icon-box">
                  <span>
                    <Icon type="ios-thumbs-up-outline" />
                    {{item.zan_count}}
                  </span>
                  <span>
                    <Icon type="ios-chatbubbles-outline" />
                    {{item.comment_count}}
                  </span>
                </div>
              </h2>
            </li>
          </ul>
        </div>
      </Card>
      <Card style="width:100%;margin-top:15px" :bordered="false">
        <div class="card-title" slot="title">
          <h2>热门活动</h2>
        </div>
        <div class="card-title">
          <ul class="card-list">
            <li :class="{top: index < 3}" v-for="(item, index) in HotActivity" :key="index">
              <div class="personal-img">
                <span class="index">{{index+1}}</span>
                <img :src="(item['user'] && item['user']['avatar']) | avatar" />
              </div>
              <h2 class="personal-content">
                <p> {{item['user'] && item['user']['nickname']}}</p>
                <span class="contetn" v-if="item['instruction']">{{item.instruction.length>36?item.instruction.slice(0,32)+'...':item.instruction}}</span>
                <div class="icon-box">
                  <span>
                    <Icon type="ios-chatbubbles-outline" />
                    {{item.activity_log_count}}
                  </span>
                </div>
              </h2>
            </li>
          </ul>
        </div>
      </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
import {
  getUserList,
  getContentTotal,
  getContentActivityApplyLog,
  getContentActivity,
  getContentPraise,
  getContentDynamic,
  getContentComment,
  getContentHotActivity,
  getContentHotDynamic

} from '@/request/api';
const nowDate = new Date();

export default {
  data() {
    return {
      veData1: {},
      extend: {
        'xAxis.0.axisLabel.rotate': 45,
        series: {
          type: 'line',//增加type字段
          barWidth: 10,
          label: {
            show: true
          },
          smooth: true
        }
      },
      colors: ['#695ff9', '#695ff9'],
      dataEmpty: false,

      dataZoom: [
        {
          type: 'slider',
          start: 0,
          end: 100,
          show: false
        },
        {
          type: 'inside',
          start: 0,
          end: 100
        }
      ],
      toolbox: {
        show: true,
        feature: {
          magicType: { type: ['line', 'bar'] },
          saveAsImage: {}
        }
      },
      time_start: this.$fmtMoment(
        new Date().setTime(nowDate.getTime() - 3600 * 1000 * 24 * 7),
        'YYYY-MM-DD'
      ),
      time_end: this.$fmtMoment(nowDate.getTime() - 86400000, 'YYYY-MM-DD'),
      detailData: '',
      dataApi: getUserList,
      tabValue: 'getContentDynamic',
      HotDynamic: '',
      HotActivity: ''
    };
  },
  computed: {
    startOptions() {
      return {
        disabledDate: (date) => {
          return (
            date &&
            (date.valueOf() > Date.now() ||
              date.valueOf() < new Date(this.time_end) - 86400000 * 30 ||
              date.valueOf() > new Date(this.time_end))
          );
        }
      };
    },
    endOptions() {
      return {
        disabledDate: (date) => {
          return (
            date &&
            (date.valueOf() > Date.now() - 86400000 ||
              date.valueOf() < new Date(this.time_start) - 86400000)
          );
        }
      };
    }
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.$refs['chart1'].echarts.resize();
      }, 500);
    });
    this.$bus.$on('changeCollapsed', () => {
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs['chart1'].echarts.resize();
        }, 500);
      });
    });
    this.initData();
  },
  methods: {
    async initData() {
      // 概况
      this.getData();
      const resDynamic = await getContentDynamic({
        time_start: this.$fmtMoment(this.time_start, 'YYYY-MM-DD'),
        time_end: this.$fmtMoment(this.time_end, 'YYYY-MM-DD')
      });
      this.veData1 = resDynamic.data;
    },
    // 获取概况数据
    async getData() {
      try {
        const res = await getContentTotal({
          time_start: this.$fmtMoment(this.time_start, 'YYYY-MM-DD'),
          time_end: this.$fmtMoment(this.time_end, 'YYYY-MM-DD')
        });
        this.detailData = res.data.data;

        const resHotDynamic = await getContentHotDynamic({
          time_start: this.$fmtMoment(this.time_start, 'YYYY-MM-DD'),
          time_end: this.$fmtMoment(this.time_end, 'YYYY-MM-DD')
        });
        const resHotHotActivity = await getContentHotActivity({
          time_start: this.$fmtMoment(this.time_start, 'YYYY-MM-DD'),
          time_end: this.$fmtMoment(this.time_end, 'YYYY-MM-DD')
        });
        console.log(resHotDynamic, resHotHotActivity);
        this.HotActivity = resHotHotActivity.data.data;
        this.HotDynamic = resHotDynamic.data.data;
      } catch (error) {
        console.log(error);
        this.$Message.error(error.msg || '获取数据失败');
      }
    },
    // 修改值
    changeValue(key, value) {
      if (value) {
        this[key] = value;
      }
    },
    // 日期搜索
    handleFilterTotal() {
      this.getData();
      this.getChart(this.tabValue);
    },

    // tab点击
    async tabClick(name) {
      this.getChart(name);
    },
    async getChart(name) {
      let params = {
        time_start: this.$fmtMoment(this.time_start, 'YYYY-MM-DD'),
        time_end: this.$fmtMoment(this.time_end, 'YYYY-MM-DD')
      };
      this.veData1 = [];
      switch (name) {
      case 'getContentDynamic':
        const resDynamic = await getContentDynamic(params);
        this.veData1 = resDynamic.data;
        break;
      case 'getContentComment':
        const resComment = await getContentComment(params);
        this.veData1 = resComment.data;
        break;
      case 'getContentActivity':
        const resActivity = await getContentActivity(params);
        this.veData1 = resActivity.data;
        break;
      case 'getContentPraise':
        const resPraise = await getContentPraise(params);
        this.veData1 = resPraise.data;
        break;
      case 'getContentActivityApplyLog':
        const resActivityApplyLog = await getContentActivityApplyLog(params);
        this.veData1 = resActivityApplyLog.data;
        break;
      default:
        break;
      }
    }
  },
  watch: {
  }
};
</script>
<style lang="less" scoped>
.worktop {
  .card-title {
    display: flex;
    align-items: center;
    h2 {
      font-size: 16px;
      color: #17233d;
      font-weight: normal;
      flex: 1;
    }
  }
  .card-list {
    max-height: 390px;
    overflow: auto;
    padding-right: 10px;
      flex: 1;
    li {
      list-style: none;
      padding: 5px 0;
      display: flex;
      align-items: flex-start;
      width: 100%;
      &.top {
        .index {
          color: #c11b1b;
          font-size: 20px;
          font-style: italic;
        }
        .personal {
          &-name {
            color: #c11b1b;
          }
        }
        p {
          color: #c11b1b;
        }
      }
      .index {
        display: inline-block;
        width: 20px;
        text-align: center;
        margin-right: 10px;
        font-size: 16px;
      }
      .personal {
        &-img {
          margin-right: 10px;
          display: flex;
          align-items: center;
          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 10px;
          }
        }
        &-content {
          font-size: 14px;
          color: #333;
          font-weight: normal;
          span {
            font-size: 12px;
            color: #999;
            margin-left: 10px;
          }
          .contetn {
            margin-left: 0;
          }
        }
      }
      .icon-box {
        margin-top: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span{
          margin-left: 0;
        }
      }
    }
  }
  .dataInfo {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    &-item {
      border-radius: 5px;
      &-info {
        margin-bottom: 10px;
      }
      .title {
        font-size: 18px;
      }
      .subTitle {
        font-size: 14px;
        color: #888;
      }
      p {
        font-size: 14px;
        color: #888;
        &.num {
          margin-top: 10px;
          font-size: 22px;
          color: #333;
          font-weight: bold;
          span {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>

<style lang="less">
.worktop {
  .count-number {
    margin-top: 10px;
    font-size: 26px;
  }
  .sub-count-number {
    font-size: 14px;
  }
}
</style>