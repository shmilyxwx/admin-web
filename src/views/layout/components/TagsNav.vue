<!--
 * @Author: fightWz
 * @Date: 2020-05-13 10:36:02
 * @LastEditors: fightWz
 * @LastEditTime: 2020-05-13 10:46:39
 * @FilePath: \view-admin\src\views\dashboard\components\TagsNav.vue
 * @Description: 标签导航
 -->
<template>
  <div class="tags-view">
    <div class="tags-view-container">
      <div ref="scrollOuter" class="scroll-outer" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
        <div ref="scrollBody" class="scroll-body" :style="{left: tagBodyLeft + 'px'}">
          <transition-group name="fade">
            <Tag
              v-for="(item, index) in Array.from(visitedViews)"
              :key="`tag-nav-${index}`"
              ref="tagsPageOpened"
              type="dot"
              :name="item.title"
              :closable="item.name !== $config.homeName"
              :color="isActive(item) ? 'primary' : 'default'"
              :data-route-item="item"
              @on-close="closeSelectedTag(item)"
              @click.native="handleClick(item)"
              @contextmenu.prevent.native="openMenu(item,$event)"
            >{{ item.title }}</Tag>
          </transition-group>
        </div>
      </div>
      <div class="btn-con left-btn">
        <Button type="text" @click="handleScroll(240)">
          <Icon :size="18" type="ios-arrow-back" />
        </Button>
      </div>
      <div class="btn-con right-btn">
        <Button type="text" @click="handleScroll(-240)">
          <Icon :size="18" type="ios-arrow-forward" />
        </Button>
      </div>
    </div>
    <ul v-show="visible" class="contextmenu" :style="{left:left+'px',top:top+'px'}">
      <li @click="closeSelectedTag(selectedTag)">关闭</li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags">关闭所有</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    posLeft: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      tagBodyLeft: 0,
      rightOffset: 40,
      outerPadding: 4,
      contextMenuLeft: 0,
      contextMenuTop: 0,
      visible: false,

      top: 0,
      left: 0,
      selectedTag: {}
    }
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    }
  },
  watch: {
    $route(to) {
      this.addViewTags()
      this.getTagElementByRoute(to)
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.addViewTags()
    setTimeout(() => {
      this.getTagElementByRoute(this.$route)
    }, 200)
  },
  methods: {
    // 点击按钮滚动
    handlescroll(e) {
      var type = e.type
      let delta = 0
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40
      }
      this.handleScroll(delta)
    },
    handleScroll(offset) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if (offset > 0) {
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)
      } else if (outerWidth < bodyWidth) {
        if (this.tagBodyLeft >= -(bodyWidth - outerWidth)) {
          this.tagBodyLeft = Math.max(
            this.tagBodyLeft + offset,
            outerWidth - bodyWidth
          )
        }
      } else {
        this.tagBodyLeft = 0
      }
    },
    generateRoute() {
      if (this.$route.name) {
        return this.$route
      }
      return false
    },
    isActive(route) {
      return route.path === this.$route.path || route.name === this.$route.name
    },
    addViewTags() {
      const route = this.generateRoute()
      if (!route) {
        return false
      }
      this.$store.dispatch('addVisitedViews', route)
    },
    getTagElementByRoute(route) {
      this.$nextTick(() => {
        this.refsTag = this.$refs.tagsPageOpened
        this.refsTag.forEach((item, index) => {
          if (item.$attrs['data-route-item'].name === route.name) {
            const tag = this.refsTag[index].$el
            this.moveToCurrentTag(tag)
          }
        })
      })
    },
    moveToCurrentTag(tag) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if (bodyWidth < outerWidth) {
        this.tagBodyLeft = 0
      } else if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + this.outerPadding
      } else if (
        tag.offsetLeft > -this.tagBodyLeft &&
        tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth
      ) {
        // 标签在可视区域
        this.tagBodyLeft = Math.min(
          0,
          outerWidth - tag.offsetWidth - tag.offsetLeft - this.outerPadding
        )
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(
          tag.offsetLeft -
          (outerWidth - this.outerPadding - tag.offsetWidth)
        )
      }
    },
    // 点击tag
    handleClick(item) {
      this.$router.push({
        name: item.name
      })
    },
    // 关闭选中的tag
    closeSelectedTag(view) {
      this.$store.dispatch('delVisitedViews', view).then(views => {
        if (this.isActive(view)) {
          const latestView = views.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView.path)
          } else {
            this.$router.push('/')
          }
        }
      })
    },
    // 关闭其他tags
    closeOthersTags() {
      if (this.selectedTag.name !== this.$route.name) {
        this.$router.push({
          name: this.selectedTag.name
        })
      }
      this.$store.dispatch('delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag(this.selectedTag)
      })
    },
    // 关闭所有tags
    closeAllTags() {
      this.$store.dispatch('delAllViews')
      this.$router.push('/')
    },
    // 打开右键菜单
    openMenu(tag, e) {
      if (tag.name === this.$config.homeName) {
        return
      }
      this.visible = true
      this.selectedTag = tag
      this.left = e.clientX
      this.top = e.clientY
    },
    // 关闭右键菜单
    closeMenu() {
      this.visible = false
    }
  }
}
</script>
<style lang="less" scoped>
.tags-view {
  transition: left 0.3s ease;
  z-index: 1;
}
.tags-view-container {
  background: #fff;
  height: 38px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  border-top: 1px solid #f9f9f9;
  border-bottom: 1px solid #f9f9f9;
  position: relative;
  z-index: 2000;
  padding: 0 20px;
  .scroll-outer {
    position: absolute;
    background: #f9f9f9;
    left: 28px;
    right: 28px;
    top: 0;
    bottom: 0;
    overflow: hidden;
    .scroll-body {
      height: ~"calc(100% - 1px)";
      display: inline-block;
      padding: 1px 4px 0;
      position: absolute;
      overflow: visible;
      white-space: nowrap;
      transition: left 0.3s ease;
    }
    .tags-view-item {
      display: inline-block;
      position: relative;
      color: #495060;
      font-size: 12px;
    }
  }
  .btn-con {
    position: absolute;
    top: 0px;
    height: 100%;
    background: #fff;
    padding-top: 3px;
    z-index: 10;
    button {
      padding: 6px 4px;
      line-height: 14px;
      text-align: center;
    }
    &.left-btn {
      left: 0px;
    }
    &.right-btn {
      right: 0px;
      border-right: 1px solid #f0f0f0;
    }
  }
}
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
