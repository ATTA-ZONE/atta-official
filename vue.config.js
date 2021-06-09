// vue.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs')

// 路径引入的方法
const resolve = (dir) => {
  return path.resolve(__dirname, dir);
}

module.exports = {
  publicPath: '/',
  outputDir: 'dist', // 打包的目录
  lintOnSave: true, // 在保存时校验格式
  productionSourceMap: false, // 生产环境是否生成 SourceMap
  // 传递第三方插件选项
  pluginOptions: {

  },
  configureWebpack: config => {
    config.entry.app = ["babel-polyfill", "./src/main.ts"];
 },
  devServer: {
    open: true, // 启动服务后是否打开浏览器
    host: '0.0.0.0',
    port: 8080, // 服务端口
    https: false,
    hotOnly: false,
    proxy: {
        '/api': {
            target: '目标网址',
            ws: true,
            changeOrigin: true,
            pathRewrite:{
                '^/api':''
            }
        }
    }, // 设置代理
    before: app => {}
  },
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [

        ]
      }
    }
  },
  chainWebpack: config => {
    // 配置别名
    config.extensions = ['.js', '.ts', '.vue', '.html'];
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
    // GraphQL Loader
    config.module
      .rule()
      .test(/\.html$/)
      .use()
        .loader('html-loader')
        .end()
  }
}
