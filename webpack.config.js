const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

/**
 * HTML Webpack Plugin
 * @desc Configuration for building the HTML page
 * @note Some props are injected and some are configuration (rendering) settings
 */
const htmlPlugin = new HtmlWebPackPlugin({
	title: "Plant a Tree Day",
	template: "./src/index.html",
	filename: "index.html",
	meta: {
		"viewport": "width=device-width, initial-scale=1, shrink-to-fit=no",
		"theme-color": "#f9f9f9"
	},
	minify: {
		collapseWhitespace: true,
		removeComments: true,
		removeRedundantAttributes: true,
		removeScriptTypeAttributes: true,
		removeStyleLinkTypeAttributes: true,
		useShortDoctype: true
	}
});

/**
 * Webpack Configuration
 */
module.exports = {
	entry: './src/index.js',
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'build'),
		publicPath: '/',
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: [
					/node_modules/,
					/.json?/
				],
				use: {
					loader: 'babel-loader'
				}
			}, {
				test: /\.(s*)css$/,
				use: [
					{
						loader:'style-loader'
					}, {
						loader:'css-loader'
					}
				]
			}
		]
	},
	plugins: [
		htmlPlugin,
		new webpack.HotModuleReplacementPlugin()
	],
	resolve: {
		extensions: ['.js','.jsx']
	},
	devServer: {
		publicPath:'http://localhost:8000',
		contentBase: path.join(__dirname, 'assets'),
		open: true, // This will auto open your browser on startup
		lazy: false, // Not sure WTF this is... but I do it
		compress: true,
		historyApiFallback: true,
		port: 8000
	}
}