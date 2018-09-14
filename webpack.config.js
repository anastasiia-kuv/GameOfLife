const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const fonts = require('./webpack/fonts');
const stylus = require('./webpack/stylus');
const icon = require('./webpack/icon');
const css = require('./webpack/css');
const pug = require('./webpack/pug');
const babel = require('./webpack/babel');
const devserver = require('./webpack/devserver');

const PATHS = {
  'source': path.join(__dirname, './src'),
  'build': path.join(__dirname, './build')
},

common = merge([{
  'entry': `${PATHS.source}/js/App.js`,
  'output': {
  'filename': 'bundle.js',
  'path': `${PATHS.build}/`
  },
  'plugins': [
    new HtmlWebpackPlugin({
      'filename': 'index.html',
      'title': 'Game of Life',
      'template': `${PATHS.source}/index.pug`
    }),
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
  css(),
  pug()
]);

module.exports = function (env) {
  if (env === 'production') {
    return merge([common]);
  }
  if (env === 'development') {
    return merge([
      common,
      devserver()
    ]);
  }
};
