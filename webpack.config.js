const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

/**
 * Root Path
 * @desc Constructs a valid path from the current project directory
 * @param args Path components
 * @returns Valid concatented path
 */
const rootPath = (...args) => args.reduce((fullPath, pathComponent) => path.join(fullPath, pathComponent), __dirname);

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
		"link": `href="https://fonts.googleapis.com/css?family=Lato", rel="stylesheet"`,
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

const hotModulePlugin = new webpack.HotModuleReplacementPlugin();

/**
 * Webpack Configuration
 */
module.exports = {
	entry: rootPath('src','index.tsx'),
	target: 'web',
	output: {
		path: rootPath('build'),
		publicPath: '/',
		filename: '[name]-bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: [
					/node_modules/,
					/.json?/,
					/contracts/
				],
				use: 'babel-loader'
			}, {
				test: /\.(ts|tsx)$/,
				use:'awesome-typescript-loader',
				exclude: [
					/node_modules/,
					/contracts/
				]
			}, {
				test: /\.(scss|css)$/,
				use: [
					{
						loader:'style-loader'
					}, {
						loader:'css-loader'
					}, {
						loader:'sass-loader'
					}
				]
			}
		]
	},
	plugins: [
		htmlPlugin,
		hotModulePlugin
	],
	resolve: {
		extensions: ['.ts','.tsx','.js','.jsx']
	},
	devServer: {
		publicPath:'http://localhost:8000',
		contentBase: rootPath('assets'),
		open: false, // This will auto open your browser on startup
		lazy: false, // Not sure WTF this is... but I do it
		compress: true,
		historyApiFallback: true,
		port: 8000
	}
}