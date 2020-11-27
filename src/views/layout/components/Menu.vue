<!--
 * @Author: fightWz
 * @Date: 2020-04-27 14:33:30
 * @LastEditors: fightWz
 * @LastEditTime: 2020-07-20 14:48:40
 * @Description: 菜单
 -->
<template>
  <Menu v-if="routes.length" :theme="$config.theme['sider_theme']" width="auto" accordion :active-name="activeName" :open-names="openNames" class="i-layout-sider-menu" @on-select="onSelect">
    <sidebar-item v-for="route in routes" :key="route.name" :item="route" />
  </Menu>
</template>
<script>
import { mapActions } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  data() {
    return {
      routes: []
    }
  },
  computed: {
    openNames() {
      const names = this.$route.matched.map(v => v.name).filter(v => v)
      return names || []
    },
    activeName() {
      return this.$route.meta.routeName || ''
    }
  },
  created() {
    this.getAdminMenu()
  },
  methods: {
    ...mapActions({
      getMenuData: 'getMenuData' // 将 `this.getMenuData()` 映射为 `this.$store.dispatch('getMenuData')`
    }),
    // 获取左侧菜单数据
    async getAdminMenu() {
      const res = await this.getMenuData()
      this.routes = res.data
      this.$emit('get-menus', true)
    },
    // 点击选中菜单
    onSelect(name) {
      if (this.$route.name === name) {
        return
      }
      this.$router.push({
        name: name
      })
    }
  }
}
</script>
