const webpack = require("webpack");
module.exports = function(config) {
	config.set({

		basePath: "",

		frameworks: ["mocha", "chai"],

		files: [
			"src/**/*.js",
			"test/**/*.js"
		],

		preprocessors: {
			"src/**/*.js": ["webpack", "sourcemap"],
			"test/**/*.js": ["webpack", "sourcemap"]
		},

		reporters: ["mocha"],

		webpack: {
			module: {
				rules: [
					{
						test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"
					},
					{
						test: /\.styl$/,
						use: [
							"style-loader",
							"css-loader",
							"stylus-loader"
						]
					},
					{
						test: /\.(woff|woff2|eot|ttf|otf)$/,
						loader: "file-loader",
						options: {
							name: "/fonts/[name].[ext]"
						},
					},
					{
						test: /\.css$/,
						use: [
							"style-loader",
							"css-loader"
						]
					}
				]
			},
			plugins: [
				new webpack.ProvidePlugin({
					$: "jquery",
					jQuery: "jquery",
					"window.jQuery": "jquery"
				}),
				new webpack.IgnorePlugin(/\.\/locale$/)  
			],
		},

		plugins: [
			require("karma-webpack"),
			require("karma-mocha"),
			require("karma-chai"),
			require("karma-mocha-reporter"),
			require("karma-chrome-launcher"),
			require("karma-phantomjs-launcher"),
			require("karma-sourcemap-loader")
		],

		autoWatch: true,

		browsers: ["PhantomJS"],

		singleRun: false,

		webpackServer: {
			noInfo: true
		}
	});
};