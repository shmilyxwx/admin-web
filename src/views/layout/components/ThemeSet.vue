<!--
 * @Author: fightWz
 * @Date: 2020-05-13 11:01:13
 * @LastEditors: fightWz
 * @LastEditTime: 2020-09-07 17:40:30
 * @FilePath: \langya-admin\src\views\dashboard\components\ThemeSet.vue
 * @Description: 主题风格设置
 -->
<template>
  <div class="theme-setting">
    <Divider>主题风格设置</Divider>
    <!-- 侧边栏配置 -->
    <div class="theme-setting-item">
      <div
        v-for="(item, index) in siderSet"
        :key="index"
        class="theme-setting-item-radio"
        :class="[setData['sider_theme']===item.type?'on':'']"
        @click="setData['sider_theme']=item.type"
      >
        <Tooltip :content="item.title">
          <img :src="item.imgSrc">
        </Tooltip>
      </div>
    </div>
    <!-- 顶栏配置 -->
    <div class="theme-setting-item">
      <div
        v-for="(item, index) in headerSet"
        :key="index"
        class="theme-setting-item-radio"
        :class="[setData['header_theme']===item.type?'on':'']"
        @click="setData['header_theme']=item.type"
      >
        <Tooltip :content="item.title">
          <img :src="item.imgSrc">
        </Tooltip>
      </div>
    </div>
    <Divider>导航设置</Divider>
    <div class="theme-setting-item">
      <span class="theme-setting-item-desc">
        置顶顶栏
        <Tooltip content="需开启固定顶栏">
          <Icon type="ios-help-circle-outline" />
        </Tooltip>
      </span>
      <span class="theme-setting-item-action">
        <i-switch v-model="setData['header_stick']" size="small" />
      </span>
    </div>
    <div class="theme-setting-item">
      <span class="theme-setting-item-desc">显示全局面包屑导航</span>
      <span class="theme-setting-item-action">
        <i-switch v-model="setData['showBread']" size="small" />
      </span>
    </div>
    <Divider>其他设置</Divider>
    <div class="theme-setting-item">
      <span class="theme-setting-item-desc">开启全屏</span>
      <span class="theme-setting-item-action">
        <i-switch v-model="setData['showFullscreen']" size="small" />
      </span>
    </div>
    <div class="theme-setting-item">
      <span class="theme-setting-item-desc">开启标签导航</span>
      <span class="theme-setting-item-action">
        <i-switch v-model="setData['showTagsNav']" size="small" />
      </span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      siderSet: [
        {
          title: '暗色侧边栏',
          imgSrc: 'https://file.iviewui.com/admin-pro-dist/img/nav-theme-dark.da07f9c2.svg',
          type: 'dark'
        },
        {
          title: '亮色侧边栏',
          imgSrc: 'https://file.iviewui.com/admin-pro-dist/img/nav-theme-light.262af236.svg',
          type: 'light'
        }
      ],
      headerSet: [
        {
          title: '亮色顶栏',
          imgSrc: 'https://file.iviewui.com/admin-pro-dist/img/nav-theme-dark.da07f9c2.svg',
          type: 'light'
        },
        {
          title: '暗色顶栏',
          imgSrc: 'https://file.iviewui.com/admin-pro-dist/img/header-theme-dark.1606ed02.svg',
          type: 'dark'
        },
        {
          title: '主色顶栏',
          imgSrc: 'https://file.iviewui.com/admin-pro-dist/img/header-theme-primary.babcd2f1.svg',
          type: 'primary'
        }
      ],
      setData: this.$config['theme']
    }
  },
  methods: {
    onSet() {
    //   this.$config['theme'];

    }
  }
}
</script>
<style lang="less" scoped>
.theme-setting {
  &-item {
    display: flex;
    align-items: center;
    padding: 12px 0;
    &-radio {
      display: inline-block;
      position: relative;
      margin-right: 16px;
      cursor: pointer;
      &.on:after {
        background: #19be6b;
      }
      &:after {
        content: '';
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 6px;
        background: transparent;
        margin: 0 auto;
      }
    }
    &-desc {
      flex: 1 1;
      font-size: 14px;
    }
    &-action {
      flex: 0 0 auto;
    }
  }
}
</style>
