<!--
 * @Author: fightWz
 * @Date: 2020-04-29 09:36:06
 * @LastEditors: fightWz
 * @LastEditTime: 2020-09-03 16:51:18
 * @Description: 评论管理
 -->
<template>
  <div class="wrap">
    <search-table
      ref="search"
      :search-props="searchProps"
      :search-params="searchParams"
      @handle-filter="handleFilter"
    ></search-table>
    <wz-table title="评论列表" ref="table" :columns="columns" :data-api="dataApi" />
  </div>
</template>
<script>
import { getCommentsList, delComments } from '@/request/api';
import columns from './mixins/columns';
export default {
  mixins: [columns],
  data() {
    return {
      dataApi: getCommentsList,
      apiParams: {}
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 获取数据
    async getData() {
      this.$refs['table'].getData(this.apiParams);
    },
    // 搜索
    handleFilter(params) {
      this.apiParams = {
        ...this.apiParams,
        ...params
      };
      this.$refs['table'].filterData(this.apiParams);
    },
    // 屏蔽
    async onDel(row) {
      try {
        await delComments({
          id: row.id
        });
        row.blacklist_at = true;
        this.$Message.success('操作成功');
      } catch (error) {
        this.$Message.error(error.msg || '操作失败');
      }
    }
  }
};
</script>