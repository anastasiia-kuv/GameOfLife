module.exports = function(config) {
	config.set({

		basePath: "",

		frameworks: ["mocha"],

		files: [
			"src/**/*.js",
			"test/**/*.js"
		],

		preprocessors: {
			"src/**/*.js": ["webpack", "sourcemap"],
			"test/**/*.js": ["webpack", "sourcemap"]
		},

		reporters: ["mocha"],

		plugins: [
			require("karma-webpack"),
			require("karma-mocha"),
			require("karma-mocha-reporter"),
			require("karma-chrome-launcher"),
			require("karma-sourcemap-loader")
		],

		autoWatch: true,

		browsers: ["Chrome"],

		singleRun: false,

		webpackServer: {
			noInfo: true
		}
	});
};