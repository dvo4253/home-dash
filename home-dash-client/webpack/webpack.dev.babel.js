import fs from 'fs';
import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import AssetsPlugin from 'assets-webpack-plugin';

import common from './webpack.common.babel';

const isDocker = fs.existsSync('/.dockerenv');
const fileRoot = process.cwd();
const { WEBPACK_DEV_SERVER_PORT, HOME_DASH_DOMAIN } = process.env;
const publicPath = `${HOME_DASH_DOMAIN}:${WEBPACK_DEV_SERVER_PORT}`;

const devPlugins = [
	new AssetsPlugin({
		filename: 'assets.json',
		path: path.join(fileRoot, '/dist/public'),
	}),
	new MiniCssExtractPlugin({
		filename: '[name].css',
	}),
	new webpack.NamedModulesPlugin(),
	new webpack.HotModuleReplacementPlugin(),
];
// eslint-disable-next-line no-unused-expressions, global-require, import/no-extraneous-dependencies
process.env.BUNDLE_ANALYZER && devPlugins.push(new (require('webpack-bundle-analyzer').BundleAnalyzerPlugin)());

const devConfig = merge({
	mode: 'development',
	devtool: 'eval-source-map', // source maps
	entry: {
		app: [
			`webpack-dev-server/client?${publicPath}`,
			'webpack/hot/only-dev-server',
			'./src/app/client.js',
		],
		styles: './src/app/styles/entry.scss',
	},
	output: {
		filename: '[name].js',
		publicPath: `${publicPath}/dist/public`,
	},
	devServer: {
		hot: true,
		disableHostCheck: true,
		https: {
			key: fs.readFileSync(path.join(process.cwd(), 'ssl/dev.home.local.key')),
			cert: fs.readFileSync(path.join(process.cwd(), 'ssl/dev.home.local.crt')),
		},
		contentBase: path.join(fileRoot, 'dist/public'),
		compress: true,
		port: 3000,
		headers: { 'Access-Control-Allow-Origin': '*' },
		host: isDocker ? '0.0.0.0' : 'localhost',
	},
	plugins: devPlugins,
}, common);

export default devConfig;
