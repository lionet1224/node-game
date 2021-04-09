const { merge } = require('webpack-merge')
const common = require('./webpack.common')
// 压缩js的插件
const TerserJSPlugin = require('terser-webpack-plugin')
// 压缩css的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCssAssetsPlugin({})]
  }
})