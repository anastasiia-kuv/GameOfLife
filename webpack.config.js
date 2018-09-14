const webpack = require('webpack'),
  UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
  HardSourceWebpackPlugin = require('hard-source-webpack-plugin'),
  merge = require('webpack-merge'),
  fonts = require('./webpack/fonts'),
  icon = require('./webpack/icon'),
  stylus = require('./webpack/stylus'),
  css = require('./webpack/css'),
  babel = require('./webpack/babel'),
  devServer = require('./webpack/devServer'),

  common = merge([
    {'entry': {
      'main': './src/js/App.js'
    },
    'output': {
      'filename': '[name].bundle.js',
      'chunkFilename': '[name].bundle.js'
    },
    'plugins': [
      new UglifyJsPlugin(),
      new HardSourceWebpackPlugin(),
      new webpack.ProvidePlugin({
        '$': 'jquery',
        'jQuery': 'jquery',
        'window.jQuery': 'jquery'
      }),
      new webpack.IgnorePlugin(/\.\/locale$/)
    ]},
    babel(),
    fonts(),
    icon(),
    stylus(),
    css()
  ]);

module.exports = function (env) {

  if (env === 'production') {

    return merge([common]);

  }
  if (env === 'development') {

    return merge([
      common,
      devServer()
    ]);

  }

};
