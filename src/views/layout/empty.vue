<!--
 * @Author: fightWz
 * @Date: 2020-04-27 16:36:43
 * @LastEditors: fightWz
 * @LastEditTime: 2020-07-20 17:40:46
 * @Description: 头部注释
 -->
<template>
  <div>
    <keep-alive :include="keepAlive">
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
export default {
  computed: {
    keepAlive() {
      return this.$store.getters.keepAlive
    }
  }
}
</script>
