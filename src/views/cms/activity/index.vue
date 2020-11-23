<!--
 * @Author: fightWz
 * @Date: 2020-04-29 09:36:06
 * @LastEditors: fightWz
 * @LastEditTime: 2020-08-27 17:28:52
 * @Description: 头部注释
 -->
<template>
  <div class="wrap">
    <search-table ref="search" :search-props="searchProps" :search-params="searchParams" @handle-filter="handleFilter">
    </search-table>
    <wz-table ref="table" title="活动管理" :handle-btns="handleBtns" :columns="columns" :data-api="dataApi" @handle-click="handleClick" />
    <!-- 添加活动 -->
    <addActivity ref="activityForm" :activityModel.sync='activityModel' @addActivity='addActivity' />
    <!-- 报名人数 -->
    <Drawer v-model="applyDrawer" :closable="false" width="900" >
      <wz-table ref="applyTable" title="报名人数" :border="false" :columns="columnsApply" :data-api="dataApiApply"/>
    </Drawer>
  </div>
</template>
<script>
import { getActivities, postActivities } from '@/request/api';
import addActivity from '../components/addActivity';
import columns from './mixins/columns';
import apply from './mixins/apply';
export default {
  mixins: [columns, apply],
  data() {
    return {
      dataApi: getActivities,
      apiParams: {
      },
      activityModel: false
    };
  },
  components: {
    addActivity
  },
  mounted() {
    this.apiParams['user_type'] = this.$route.meta.user_type;
    if (this.$route.params.custom_id) {
      this.apiParams['search_content'] = this.$route.params.custom_id;
    }
    this.getData();
  },
  methods: {
    // 获取数据
    async getData() {
      this.$refs['table'].getData(this.apiParams);
    },
    // 搜索
    handleFilter(params, type) {
      if (type === 'reset') {
        this.apiParams = {
          search_content: this.$route.params.custom_id,
          user_type: this.$route.meta.user_type
        };
      }
      this.apiParams = {
        ...this.apiParams,
        ...params
      };
      this.$refs['table'].filterData(this.apiParams);
    },
    // 按钮点击事件
    handleClick(type, row = { content: '', resource: [], location: {} }) {
      this.formObj = { ...row };
      this.rowData = row;
      this.selectUserGender = this.rowData.gender === '男' ? '女' : '男';
      switch (type) {
      case 'add': // 添加
        this.activityModel = true;
        break;
      default:
        break;
      }
    },
    // 添加动态发布
    async addActivity(obj) {
      try {
        const res = await postActivities({
          user_id: this.$route.params.user_id,
          ...obj,
          ...obj.location
        });
        this.$Message.success(res.msg);
        this.getData();
        this.$refs['activityForm'].initFormObj();
      } catch (error) {
        this.$Message.error(error.msg || '操作失败');
      }
    }
  },
  watch: {
    $route(newValue) {
      this.apiParams['user_type'] = newValue.meta.user_type;
      this.getData();
    }
  }
};
</script>
<style lang="less" scoped>
</style>