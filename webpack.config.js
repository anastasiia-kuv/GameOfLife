const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const fonts = require('./webpack/fonts');
const stylus = require('./webpack/stylus');
const icon = require('./webpack/icon');
const css = require('./webpack/css');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const babel = require('./webpack/babel');

const PATHS = {
  source: path.join(__dirname, './src'),
  build: path.join(__dirname, './build'),
};


const common = merge([{
  entry: {
    viewTemplate: `${PATHS.source}/viewTemplate.js`,
    bundle: `${PATHS.source}/index.js`,
  },
  output: {
    filename: '[name].bundle.js',
    path: `${PATHS.build}/`,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'Game of Life',
      template: `${PATHS.source}/index.pug`,
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new webpack.IgnorePlugin(/\.\/locale$/),
  ],
},
babel(),
module.exports = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          keep_fnames: true,
        },
      }),
    ],
  },
},
fonts(),
icon(),
stylus(),
css(),
pug(),
]);

module.exports = function (env) {
  if (env === 'production') {
    return merge([common]);
  }
  if (env === 'development') {
    return merge([
      common,
      devserver(),
    ]);
  }
};
