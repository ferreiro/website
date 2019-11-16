const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const LIB_PATH = path.join(__dirname, './lib')
const DIST_PATH = path.join(__dirname, '../ferreiro-server/dist')

module.exports = {
    entry: {
        client: './src/index.js',
    },
    output: {
        filename: 'client.bundle.js',
        path: LIB_PATH,
    },
    // This is required to make the hot reload work for the web...
    target: 'web',
    devServer: {
        contentBase: DIST_PATH,
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
          to: DIST_PATH
        }]),
        new CopyWebpackPlugin([{
          from: './lib',
          to: DIST_PATH
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