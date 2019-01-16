import merge from 'webpack-merge';
import path from 'path';
import webpack from 'webpack';
import DiskPlugin from 'webpack-disk-plugin';
import common from './webpack.common.babel';

const fileRoot = process.cwd();

// Write out asset files to disk.
const writeToDisk = new DiskPlugin({
	output: {
		path: path.join(fileRoot, '/dist/public'),
	},
	files: [
		{ asset: 'assets.json' },
		{ asset: /app.[a-f0-9]{20}\.js/ },
		{ asset: /vendors.[a-f0-9]{20}\.js/ },
		{ asset: /runtime.[a-f0-9]{20}\.js/ },
		{ asset: /app.[a-f0-9]{20}\.css/ },
	],
});

const prodConfig = merge({
	entry: {
		app: [
			'./src/app/client.js',
			'./src/app/styles/entry.scss',
		],
	},
	mode: 'development',
	devtool: 'source-map', // source maps
	cache: true,
	plugins: [
		writeToDisk,
		// new webpack.NamedModulesPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('dev'),
			},
		}),
	],
	output: {
		path: path.join(fileRoot, '/dist/public'),
	},
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					enforce: true,
					chunks: 'all',
				},
			},
		},
	},
}, common);

module.exports = prodConfig;
