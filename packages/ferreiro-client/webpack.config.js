const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const DESTINATION_PATH = path.join(__dirname, '../ferreiro-server/dist');

module.exports = {
    entry: {
        client: './src/index.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: DESTINATION_PATH,
    },
    // This is required to make the hot reload work for the web...
    target: 'web',
    devServer: {
        contentBase: DESTINATION_PATH,
        compress: true,
        port: 9000
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new CopyWebpackPlugin([{
          from: './images/**/**',
          to: DESTINATION_PATH
        }]),
        new ImageminPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader"
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
}