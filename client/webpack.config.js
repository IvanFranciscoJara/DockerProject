var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
// const CopyPlugin = require('copy-webpack-plugin')
// const webpack = require('webpack')
// const { InjectManifest } = require('workbox-webpack-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = env => {
  // console.log('TIPO', env.TIPO)
  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
      publicPath: '/'
    },
    devtool: 'source-map',
    // devServer: {
    //   // webpack-dev-server
    //   // host: '0.0.0.0',
    //   port: 8888,
    //   historyApiFallback: true,
    //   watchOptions: {
    //     poll: true
    //   }
    // },
    node: {
      fs: 'empty'
    },
    module: {
      rules: [
        { test: /\.(js)$/, include: path.resolve(__dirname, 'src'), use: 'babel-loader' },
        { test: /\.css$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
        { test: /\.sass$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
        // { test: /\.(gif|svg|jpg|png)$/, loader: 'file-loader' }
      ]
    },
    mode: 'development',
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      })
      // new webpack.DefinePlugin({
      //   GLOBAL_URL: JSON.stringify(env.TIPO === 'local' ? 'http://localhost:8080/' : 'https://www.ivanf.net/')
      // }),
      // new CopyPlugin({
      //   patterns: [
      //     {
      //       from: path.resolve(__dirname, 'src/manifest.json'),
      //       to: path.resolve(__dirname, 'dist/manifest.json')
      //     },
      //     {
      //       from: path.resolve(__dirname, 'robots.txt'),
      //       to: path.resolve(__dirname, 'dist/robots.txt')
      //     },
      //     {
      //       from: path.resolve(__dirname, 'src/imagenes'),
      //       to: path.resolve(__dirname, 'dist/imagenes')
      //     },
      //     {
      //       from: path.resolve(__dirname, 'src/.well-known'),
      //       to: path.resolve(__dirname, 'dist/.well-known')
      //     }
      //   ]
      // }),
      // new InjectManifest({
      //   swSrc: './src-sw.js',
      //   swDest: 'sw.js'
      // })
    ]
  }
}
