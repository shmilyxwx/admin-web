/*
 * @Author: fightWz
 * @Date: 2020-04-24 16:33:20
 * @LastEditors: fightWz
 * @LastEditTime: 2020-09-08 16:12:03
 * @Description: 项目配置文件
 */
export default {
  theme: {
    sider_width: 220,
    sider_theme: 'dark', // dark或者light
    header_theme: 'light', // dark或者light
    header_stick: false,
    showBread: true, // 显示面包屑导航
    showFullscreen: true, // 显示全屏按钮
    showTagsNav: false // 显示标签导航
  },
  openPermision: true, // 开启操作权限
  // 文件上传地址
  uploadUrl: (location.hostname === 'localhost' || location.hostname.indexOf('192') !== -1 || location.hostname.indexOf('47.98.162.11') !== -1) ? 'https://up-z0.qiniup.com' : 'https://up-z2.qiniup.com',
  // 七牛文件地址
  fileUrl: 'http://chat.qiniu.langyaapp.com/'
}
