import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackHarddiskPlugin from 'html-webpack-harddisk-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import HtmlWebpackPugPlugin from 'html-webpack-pug-plugin';
import path from 'path';
import 'pug-loader';

const fileRoot = process.cwd();
const extractSass = new ExtractTextPlugin({
	filename: '[name].[hash].css',
});

module.exports = {
	output: {
		filename: '[name].[hash].js',
		path: path.resolve(fileRoot, 'dist/public'),
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: extractSass.extract({
					use: [{
						loader: 'css-loader',
					}, {
						loader: 'sass-loader',
					}],
					// use style-loader in development
					fallback: 'style-loader',
				}),
				include: path.join(fileRoot, 'src'),
			},
			{
				test: /.js$/,
				loader: 'babel-loader',
				include: path.join(fileRoot, 'src/app'),
			},
		],
	},
	plugins: [
		new AssetsPlugin({
			filename: 'assets.json',
			path: path.join(fileRoot, '/dist/public'),
		}),
		extractSass,

		new HtmlWebpackPlugin({
			filename: 'output.pug',
			alwaysWriteToDisk: true,
			template: 'src/server/template/index.pug',
			inject: 'body',
		}),
		new HtmlWebpackPugPlugin(),
		new HtmlWebpackHarddiskPlugin(),
		new CleanWebpackPlugin([path.join(fileRoot, 'dist/public')], {
			root: path.join(__dirname, '../'),
			verbose: true,
		}),
	],
};
