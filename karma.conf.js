const webpackConfig = require('./webpack.config');

module.exports = function (config) {
  config.set({
    basePath: '',
    autoWatch: true,
    singleRun: false,

    plugins: [
      'mocha',
      'karma-webpack',
      'karma-mocha',      
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-mocha-reporter',
    ],

    frameworks: ['mocha'],

    files: [
      'node_modules/babel-polyfill/browser.js',
      'test/View.test.js',
      'test/Model.test.js',
      'test/Controller.test.js',
    ],

    node: {
      fs: 'empty',
    },

    watch: true,

    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['PhantomJS'],
    webpack: webpackConfig('development'),

    preprocessors: {
      'test/Test.js': ['webpack'],
      'test/View.test.js': ['webpack'],
      'test/Model.test.js': ['webpack'],
      'test/Controller.test.js': ['webpack'],
    },
  });
};
