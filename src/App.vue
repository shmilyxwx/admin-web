<!--
 * @Author: fightWz
 * @Date: 2020-04-24 11:39:31
 * @LastEditors: fightWz
 * @LastEditTime: 2020-09-12 09:41:25
 * @Description: 入口页面
 -->
<template>
  <div id="app">
    <keep-alive :include="keepAlive">
      <router-view v-if="isRouterAlive" />
    </keep-alive>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isRouterAlive: true
    }
  },
  computed: {
    keepAlive() {
      return this.$store.getters.keepAlive
    }
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #515a6e;
}
#app,
body,
html {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: #fff;
}
.wrap{
  padding: 20px;
}
.v-charts-data-empty {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: hsla(0,0%,100%,.9);
    color: #888;
    font-size: 14px;
}
@import "./assets/css/index.less";
</style>
