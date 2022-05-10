const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlPlugin({
      template: './src/index.html'
    })
  ],
  devServer: {
    port: 1234,
  }
}