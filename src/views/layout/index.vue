<!--
 * @Author: fightWz
 * @Date: 2020-04-24 16:07:32
 * @LastEditors: fightWz
 * @LastEditTime: 2020-11-02 13:21:10
 * @Description: dashboard
 -->
<template>
  <Layout class="i-layout">
    <Sider ref="sider" v-model="isCollapsed" :width="$config.theme['sider_width']" hide-trigger collapsible :collapsed-width="78" :class="['i-layout-sider-' + $config.theme['sider_theme'], 'i-layout-sider']">
      <div class="sider-con">
        <div class="logo">
          <a href="/" target="_self">
            <img :src="logoImg">
            <span v-if="!isCollapsed">管理平台</span>
          </a>
        </div>
        <div :class="['sider-menu', isCollapsed?'':'noCollapsed']">
          <wz-menu ref="menu" />
        </div>
      </div>
    </Sider>
    <Layout style="background:#f9f8ff">
      <Header :class="['i-layout-header-' + $config.theme['header_theme'], 'i-layout-header']">
        <span class="trigger" style="position:relative;top:6px;" @click="collapsedSider">
          <s-icon :icon-class="isCollapsed ? 'menu_open' : 'menu_close'" scale="2.5" />
        </span>
        <div class="i-layout-header-right">
          <!-- 全屏 -->
          <full-screen v-if="$config.theme['showFullscreen']" v-model="isFullscreen" />
          <!-- 消息 -->
          <Notifications />
          <!-- 登录用户信息 -->
          <wz-user />
          <!-- 主题风格设置 -->
          <!-- <span class="trigger" @click="themeDrawer=true">
            <Icon type="md-more" :size="18"/>1
          </span> -->
        </div>
      </Header>
      <!-- 标签导航 -->
      <transition v-if="$config.theme['showTagsNav']">
        <tags-nav />
      </transition>
      <!-- 面包屑、刷新返回 -->
      <bread v-if="$config.theme['showBread']" />
      <Content class="i-layout-content">
        <keep-alive :include="keepAlive">
          <router-view />
        </keep-alive>
        <footer>版本号：v2.2.8</footer>
      </Content>
    </Layout>
    <!-- 主题风格设置 -->
    <Drawer v-model="themeDrawer">
      <theme-set />
    </Drawer>
  </Layout>
</template>
<script>
import wzUser from './components/User'
import wzMenu from './components/Menu'
import FullScreen from './components/FullScreen'
import TagsNav from './components/TagsNav'
import ThemeSet from './components/ThemeSet'
import Bread from './components/Bread'
import Notifications from './components/Notifications'
export default {
  components: {
    wzUser,
    wzMenu,
    FullScreen,
    TagsNav,
    ThemeSet,
    Bread,
    Notifications
  },
  data() {
    return {
      logoImg: require('@/assets/images/logo.png'),
      isCollapsed: false, // 左侧菜单是否收起
      isFullscreen: false, // 全屏设置
      themeDrawer: false // 主题风格设置
    }
  },
  computed: {
    key() {
      return this.$route.fullPath
    },
    keepAlive() {
      return this.$store.getters.keepAlive
    }
  },
  methods: {
    // 左侧菜单展开关闭
    collapsedSider() {
      this.isCollapsed = !this.isCollapsed
      this.$refs['menu'].collapsedSider(this.isCollapsed)
      this.$bus.$emit('changeCollapsed', this.isCollapsed)
    }
  }
}
</script>
<style lang="less" scoped>
.i-layout {
  height: 100vh;
  overflow: hidden;
  &-sider {
    box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
    z-index: 1000;
    .sider-con {
      position: relative;
      height: 100vh;
      display: flex;
      flex-direction: column;
      padding-top: 67px;
    }
    .logo {
      font-size: 24px;
      height: 64px;
      line-height: 90px;
      display: flex;
      align-items: center;
      padding-left: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      z-index: 1000;
      overflow: hidden;
      a {
        color: #fff;
        img {
          height: 30px;
          vertical-align: middle;
          display: inline-block;
          margin-right: 10px;
        }
      }
    }
    .sider-menu {
      flex: auto;
      height: 100%;
      &.noCollapsed {
        overflow: auto;
      }
    }
    // 深色
    &-dark {
      background: #191a23;
      box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    }
    // 亮色
    &-light {
      background: #fff;
      .logo {
        box-shadow: 0px 2px 6px rgba(0, 21, 41, 0.08);
        a {
          color: #333;
        }
      }
    }
  }
  &-header {
    padding: 0 20px;
    box-shadow: 0px 2px 6px rgba(0, 21, 41, 0.08);
    transition: all 0.2s ease-in-out;
    position: relative;
    z-index: 100;
    display: flex;
    .trigger {
      color: #fff;
      cursor: pointer;
      margin-right: 20px;
    }
    &-light {
      background: #fff;
      .trigger {
        color: #333;
      }
    }
    &-right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }
  }
  &-content {
    overflow: auto;
  }
  footer {
    text-align: center;
    padding: 0 0 20px;
    font-size: 14px;
    color: #999;
  }
}
</style>
