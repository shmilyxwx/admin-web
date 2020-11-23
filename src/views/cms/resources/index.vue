<!--
 * @Author: fightWz
 * @Date: 2020-04-29 09:36:06
 * @LastEditors: fightWz
 * @LastEditTime: 2020-09-03 16:51:37
 * @Description: 资源审核
 -->
<template>
  <div class="wrap">
    <search-table ref="search" :search-props="searchProps" :search-params="searchParams" @handle-filter="handleFilter">
    </search-table>
    <wz-table title="资源列表" ref="table" :columns="columns" :data-api="dataApi" />
  </div>
</template>
<script>
import { getResources } from '@/request/api';
import columns from './mixins/columns';
export default {
  mixins: [columns],
  data() {
    return {
      dataApi: getResources,
      apiParams: {
        user_type: 1
      }
    };
  },
  mounted() {
    // type 1是真实用用，2虚拟用户
    this.apiParams['user_type'] = this.$route.meta.user_type;
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
        this.apiParams = { user_type:this.$route.meta.user_type};
      }
      this.apiParams = { ...this.apiParams, ...params };
      this.$refs['table'].filterData(this.apiParams);
    }
  }
};
</script>
<style lang="less" scoped>
</style>