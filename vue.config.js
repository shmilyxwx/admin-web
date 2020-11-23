/*
 * @Author: fightWz
 * @Date: 2020-04-24 15:14:36
 * @LastEditors: fightWz
 * @LastEditTime: 2020-05-13 16:28:59
 * @Description: config配置
 */
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : '/'
// 服务器地址

const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: BASE_URL,
  outputDir: 'dist',
  assetsDir: 'static',
  indexPath: 'index.html',
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      title: '后台管理平台',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
    config.resolve.alias.set('@images', resolve('./src/assets/images'))
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module.rule('icons').test(/\.svg$/).include.add(resolve('src/icons')).end().use('svg-sprite-loader').loader('svg-sprite-loader').options({ symbolId: 'icon-[name]' }).end()
  },
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionWebpackPlugin({
            test: /\.js$|\.html|\.css|\.scss/,
            threshold: 10240,
            deleteOriginalAssets: false
          })
        ]
      }
    }
  }
}
