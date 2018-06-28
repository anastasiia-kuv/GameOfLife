const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const merge = require('webpack-merge');
const fonts = require('./webpack/fonts');
const stylus = require('./webpack/stylus');
const css = require('./webpack/css');
const babel = require('./webpack/babel');
const devServer = require('./webpack/devServer');

const PATHS = {
  root: path.join(__dirname, './'),
  source: path.join(__dirname, './src')
};

const common = merge([
{
entry: {
  main: "./src/js/app.js",
},
output: {
  filename: '[name].bundle.js',
  chunkFilename: '[name].bundle.js',
  path: PATHS.root
},
plugins: [
  new UglifyJsPlugin(),
  new HardSourceWebpackPlugin(),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery'
    }),
  new webpack.IgnorePlugin(/\.\/locale$/)  
  ],
},
babel(),
fonts(),
stylus(),
css()
]);

module.exports = function(env) {
  if (env === 'production') {
    return merge([
      common
  ])
  }
  if (env === 'development') {
    return merge([
        common,
        devServer()
    ])
  }
};