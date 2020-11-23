// 全局引入SvgIcon组件
import Vue from 'vue'
import SvgIcon from './svgIcon'
Vue.component('s-icon', SvgIcon)

// 设置icons/svg下面的图片自动导入
const req = require.context('./svg', false, /\.svg$/)
req.keys().map(req)
