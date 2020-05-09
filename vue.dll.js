const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    vue: [
      'vuex',
      'vue-router',
      'axios'
    ],
    element: [
      'vue',
      'element-ui'
    ]
  },
  output: {
    path: path.join(__dirname, 'dll'),
    filename: '[name].dll.js',
    library: '[name]_[hash]'
  },

  plugins: [
    new webpack.DllPlugin({
      context: process.cwd(),
      path: path.join(__dirname, 'dll', '[name]-manifest.json'),
      name: '[name]_[hash]'
    })
  ]
}
