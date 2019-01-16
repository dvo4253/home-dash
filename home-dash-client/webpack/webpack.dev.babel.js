import merge from 'webpack-merge';
import path from 'path';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
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

const devPlugins = [
	writeToDisk,
	// new WriteAssetsWebpackPlugin({ force: true, extension: ['html'] }),
	new webpack.NamedModulesPlugin(),
	new webpack.HotModuleReplacementPlugin(),
];

// enable for the bundle analyzer to show in browser
if (process.env.ANALYZE) {
	devPlugins.push(new BundleAnalyzerPlugin());
}


const devConfig = merge({
	entry: {
		app: [
			'react-hot-loader/babel',
			'webpack-dev-server/client?http://localhost:3000',
			'webpack/hot/only-dev-server',
			'./src/app/client.js',
			'./src/app/styles/entry.scss',
		],
	},
	mode: 'development',
	// devtool: 'cheap-module-source-map',  // may speed up rebuild but no source maps
	devtool: 'eval-source-map', // source maps
	cache: true,
	devServer: {
		contentBase: path.join(fileRoot, 'dist/public'),
		compress: true,
		port: 3000,
	},
	output: {
		publicPath: 'http://localhost:3000/dist/public',
	},
	plugins: devPlugins,
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

module.exports = devConfig;
