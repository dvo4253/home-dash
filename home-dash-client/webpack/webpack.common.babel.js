import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin';
import HtmlWebpackPugPlugin from 'html-webpack-pug-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const fileRoot = process.cwd();

const defaultModules = {
	rules: [
		{
			test: /\.scss$/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				'postcss-loader',
				'sass-loader',
			],
		},
		{
			test: /.js$/,
			loader: 'babel-loader',
			include: path.join(fileRoot, 'src/app'),
		},
	],
};

const defaultPlugins = [
	new HtmlWebpackPlugin({
		filename: 'output.pug',
		alwaysWriteToDisk: true,
		template: 'src/server/template/index.pug',
		inject: 'body',
	}),
	new HtmlWebpackPugPlugin(),
	new HtmlWebpackHarddiskPlugin(),
];

const defaultOptimizations = {
	runtimeChunk: 'single',
	splitChunks: {
		cacheGroups: {
			vendors: {
				test: /[\\/]node_modules[\\/]/,
				name: 'vendors',
				chunks: 'all',
				enforce: true,
			},
			styles: {
				name: 'styles',
				test: /\.scss$/,
				chunks: 'all',
				enforce: true,
			},
		},
	},
};

export default {
	cache: true,
	output: {
		path: path.resolve(fileRoot, 'dist/public'),
	},
	module: defaultModules,
	plugins: defaultPlugins,
	optimization: defaultOptimizations,
};
