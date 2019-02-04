import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';

const fileRoot = process.cwd();

const serverPack = {
	mode: 'production',
	stats: 'minimal',
	target: 'node',
	entry: './src/server/index.js',
	devtool: 'source-map',
	output: {
		path: path.join(fileRoot, '/dist/server'),
		filename: 'index.js',
	},
	externals: [nodeExternals()], // do not attempt to bundle node_modules
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new webpack.BannerPlugin({ banner: 'require("source-map-support").install();', raw: true, entryOnly: false }),
	],
};

module.exports = serverPack;
