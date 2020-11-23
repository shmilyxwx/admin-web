<!--
 * @Author: fightWz
 * @Date: 2020-04-29 09:36:06
 * @LastEditors: fightWz
 * @LastEditTime: 2020-09-03 16:49:52
 * @Description: 头部注释
 -->
<template>
  <div class="wrap">
    <wz-table ref="table" title="活动列表" :columns="columns" :data-api="dataApi" @handle-click="handleClick" />
  </div>
</template>
<script>
import { getApplyList } from '@/request/api';
import columns from './mixins/columns';
export default {
  mixins: [columns],
  data() {
    return {
      dataApi: getApplyList,
      apiParams:{}
    };
  },

  mounted() {
    if (this.$route.params.id) {
      this.apiParams['activity_id'] = this.$route.params.id;
    }
    this.getData();
  },
  methods: {
    // 获取数据
    async getData() {
      this.$refs['table'].getData(this.apiParams);
    }
  }
};
</script>
<style lang="less" scoped>
</style>