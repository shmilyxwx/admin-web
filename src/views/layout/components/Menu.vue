<!--
 * @Author: fightWz
 * @Date: 2020-04-27 14:33:30
 * @LastEditors: fightWz
 * @LastEditTime: 2020-07-20 14:48:40
 * @Description: 菜单
 -->
<template>
  <Menu v-if="menus.length" :theme="$config.theme['sider_theme']" width="auto" accordion :active-name="activeName" :open-names="openNames" class="i-layout-sider-menu" @on-select="onSelect">
    <!-- 左侧展开 -->
    <div v-show="isCollapsed" style="width:70px">
      <Dropdown v-for="(item, index) in menus" :key="index" class="i-layout-sider-collapse" placement="right-start" @on-click="onSelect">
        <MenuItem :name="item.name">
          <i class="icon">
            <s-icon :icon-class="item.icon || 'fa-menu-3'" scale="1.5" />
          </i>
        </MenuItem>
        <DropdownMenu v-if="item.child && item.child.length" slot="list">
          <DropdownItem v-for="(child,key) in item.child" :key="key" :selected="activeName === child.name" :name="child.name">{{ child.title }}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div v-show="!isCollapsed">
      <template v-for="(item,index) in menus">
        <Submenu v-if="item.child && item.child.length" :key="index" :name="item.name">
          <template slot="title">
            <i class="icon">
              <s-icon :icon-class="item.icon || 'fa-menu-3'" scale="1.5" />
            </i>
            <span>{{ item.title }}</span>
          </template>
          <template v-for="(child,index) in item.child">
            <Submenu v-if="child.child && child.child.length" :key="index+1000" :name="child.name">
              <template slot="title">{{ child.title }}</template>
              <MenuItem v-for="(v,index) in child.child" :key="index+10000" :name="v.name">{{ v.title }}</MenuItem>
            </Submenu>
            <MenuItem v-else :key="index+1000" :name="child.name">{{ child.title }}</MenuItem>
          </template>
        </Submenu>
        <MenuItem v-else :key="index" :name="item.name">
          <i class="icon">
            <s-icon :icon-class="item.icon || 'fa-menu-3'" scale="1.5" />
          </i>
          <span>{{ item.title }}</span>
        </MenuItem>
      </template>
    </div>
  </Menu>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      menus: [],
      isCollapsed: false
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
      this.menus = res.data
      this.$emit('get-menus', true)
    },
    // 左侧菜单展开关闭
    collapsedSider(isCollapsed) {
      this.isCollapsed = isCollapsed
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
