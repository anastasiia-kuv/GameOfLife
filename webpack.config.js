const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const merge = require('webpack-merge');
const fonts = require('./src/webpack/fonts');
const stylus = require('./src/webpack/stylus');
const css = require('./src/webpack/css');
const devserver = require('./src/webpack/devserver');

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
        devserver()
    ])
  }
};