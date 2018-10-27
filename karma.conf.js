const webpack = require('webpack');
const karmaWebpack = require('karma-webpack');
const karmaMocha = require('karma-mocha');
const karmaChai = require('karma-chai');
const karmaMochaReporter = require('karma-mocha-reporter');
const karmaChromeLauncher = require('karma-chrome-launcher');
const karmaPhantomjsLauncher = require('karma-phantomjs-launcher');
const karmaSourcemapLoader = require('karma-sourcemap-loader');

module.exports = function (config) {
  config.set({

    basePath: '',

    frameworks: [
      'mocha',
      'chai',
    ],

    files: [
      'src/**/*.js',
      'test/**/*.js',
    ],

    preprocessors: {
      'src/**/*.js': [
        'webpack',
        'sourcemap',
      ],
      'test/**/*.js': [
        'webpack',
        'sourcemap',
      ],
    },

    reporters: ['mocha'],

    webpack: {
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
          },
          {
            test: /\.styl$/,
            use: [
              'style-loader',
              'css-loader',
              'stylus-loader',
            ],
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            loader: 'file-loader',
            options: {
              name: '/fonts/[name].[ext]',
            },
          },
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader',
            ],
          },
        ],
      },
      plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery',
        }),
        new webpack.IgnorePlugin(/\.\/locale$/),
      ],
    },

    plugins: [
      karmaWebpack(),
      karmaMocha(),
      karmaChai(),
      karmaMochaReporter(),
      karmaChromeLauncher(),
      karmaPhantomjsLauncher(),
      karmaSourcemapLoader(),
    ],

    autoWatch: true,

    browsers: ['PhantomJS'],

    singleRun: false,

    webpackServer: {
      noInfo: true,
    },
  });
};
