const path = require('path')
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
  publicPath: './',
  outputDir: './dist',
  // source-map配置
  productionSourceMap: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'https://www.baidu.com/',
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    plugins: [
      new DllReferencePlugin({
        context: process.cwd(),
        manifest: require('../dll/element-manifest.json')
      }),
      new DllReferencePlugin({
        context: process.cwd(),
        manifest: require('../dll/vue-manifest.json')
      }),
      new AddAssetHtmlPlugin([{
        publicPath: 'dll/',
        outputPath: 'dll/',
        filepath: path.resolve(__dirname, './dll/vue.dll.js')
      }, {
        publicPath: 'dll/',
        outputPath: 'dll/',
        filepath: path.resolve(__dirname, './dll/element.dll.js')
      }])
    ],
    externals: {}
  },
  chainWebpack: config => {
    // 移除 prefetch 插件
    // config.plugins.delete('prefetch');
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
  },
  transpileDependencies: ['vue-baidu-map'] // 按百度地图需引入时，未编译，需要babel编译
}

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, 'src/style/variable.less')
      ]
    })
}
