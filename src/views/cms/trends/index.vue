<!--
 * @Author: fightWz
 * @Date: 2020-04-29 09:36:06
 * @LastEditors: fightWz
 * @LastEditTime: 2020-09-01 15:56:50
 * @Description: 动态管理
 -->
<template>
  <div class="wrap trends" v-if="isRefresh">
    <search-table ref="search" title="动态管理" :search-props="searchProps" :search-params="searchParams" @handle-filter="handleFilter">
      <template v-slot:content>
        <Tabs type="card" v-model="apiParams['type']" @on-click="changeTab">
          <TabPane label="真实动态" name="1"></TabPane>
          <TabPane label="虚拟动态" name="2"></TabPane>
        </Tabs>
        <!-- 动态列表 -->
        <trends ref="trends" />
      </template>
    </search-table>
  </div>
</template>
<script>
import trends from '@/components/cms/trends';
export default {
  name: 'cms-trends',
  components: {
    trends
  },
  data() {
    return {
      isRefresh: true,
      searchParams: {
        gender: 0,
        search_content: ''
      },
      searchProps: [
        {
          key: 'search_content',
          placeholder: '输入ID/昵称/手机号',
          label: '用户搜索',
          labelWidth: 80
        },
        {
          key: 'content',
          label: '动态内容'
        },
        {
          key: 'dynamic_id',
          label: '动态ID'
        },
        {
          key: 'created_at',
          label: '发布时间',
          type: 'date'
        },
        {
          key: 'gender',
          label: '性别',
          type: 'select',
          width: 120,
          clearable: true,
          options: {
            data: [
              {
                value: 0,
                label: '全部'
              },
              {
                value: '男',
                label: '男'
              },
              {
                value: '女',
                label: '女'
              }
            ]
          }
        }
      ],
      apiParams: {
        type: '1'
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 获取数据
    async getData() {
      this.$refs['trends'].getData(this.apiParams);
    },
    // 搜索
    handleFilter(params) {
      this.apiParams = {
        ...this.apiParams,
        ...params
      };
      this.getData();
    },
    // 修改类型
    changeTab(type) {
      this.$refs['search'].onReset();
      this.apiParams = {
        type: type
      };
      this.$refs['trends'].initData(this.apiParams);
    }
  }
};
</script>