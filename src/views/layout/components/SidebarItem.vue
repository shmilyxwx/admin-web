<!--
 * @Author: fightWz
 * @Date: 2020-04-27 14:33:30
 * @LastEditors: fightWz
 * @LastEditTime: 2020-07-20 14:48:40
 * @Description: 菜单
 -->
<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.child,item) && (!onlyOneChild.child||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <MenuItem :name="item.name">
        <i class="icon">
          <s-icon :icon-class="item.icon || 'fa-menu-3'" scale="1.5" />
        </i>
        <span>{{ item.title }}</span>
      </MenuItem>
    </template>
    <Submenu v-else ref="subMenu" :name="item.name">
      <template slot="title">
        <i class="icon">
          <s-icon :icon-class="item.icon || 'fa-menu-3'" scale="1.5" />
        </i>
        <span>{{ item.title }}</span>
      </template>
      <sidebar-item v-for="child in item.child" :key="child.name" :is-nest="true" :item="child" class="nest-menu" />
    </Submenu>
  </div>
</template>
<script>
import SidebarItem from './SidebarItem'

export default {
  name: 'SidebarItem',
  components: { SidebarItem },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    this.onlyOneChild = null
    return {}
  },
  methods: {
    hasOneShowingChild(child = [], parent) {
      const showingChildren = child.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return true
      }

      return false
    }
  }
}
</script>
