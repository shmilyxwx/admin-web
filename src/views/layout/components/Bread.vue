<!--
 * @Author: fightWz
 * @Date: 2020-05-28 09:37:20
 * @LastEditors: fightWz
 * @LastEditTime: 2020-05-28 10:34:39
 * @FilePath: \exam-admin\src\views\dashboard\components\Bread.vue
 * @Description: 面包屑
-->
<template>
  <div class="bread">
    <div class="line" />
    <div class="bread-l">
      <Breadcrumb>
        <BreadcrumbItem v-for="(item, index) in breads" :key="index">{{ item.meta.title }}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="bread-r">
      <Button style="margin-right: 10px" @click="onRefresh"><Icon type="ios-refresh" size="20" />刷新</Button>
      <Button @click="goBack"><Icon type="ios-arrow-back" size="20" />返回</Button>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    breads() {
      const breads = []
      this.$route.matched.forEach(v => {
        if (v.name) {
          breads.push(v)
        }
      })
      return breads
    }
  },
  inject: ['reload'],
  methods: {
    // 刷新
    onRefresh() {
      this.reload()
    },
    // 返回上一层
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
    .bread{
        display: flex;
        padding:5px 20px;
        align-items: center;
        background: #f9f9f9;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
        position: relative;
        z-index: 10;
        .line{
            height: 16px;
            width: 4px;
            background: #695ff9;
            margin-right: 15px;
        }
        &-l{
            flex: 1;
        }
    }
</style>
