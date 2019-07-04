const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const CONFIG = {
    input: {
        path: './src/index.js',
    },
    output: {
        path: path.join(__dirname, '../ferreiro-server/dist'),
    }
}

module.exports = {
    entry: {
        client: CONFIG.input.path,
    },
    output: {
        filename: '[name].bundle.js',
        path: CONFIG.output.path,
    },
    // This is required to make the hot reload work for the web...
    target: 'web',
    devtool: "source-map", // any "source-map"-like devtool is possible
    devServer: {
        contentBase: CONFIG.output.path,
        compress: true,
        port: 9000
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: "[id].css"
        }),
        new CopyWebpackPlugin([{
          from: './images/**/**',
          to: CONFIG.output.path
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
                    // fallback to style-loader in development
                    process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    'file-loader'
                    // {
                    //     loader: 'url-loader',
                    //     options: { 
                    //         limit: 8000, // Convert images < 8kb to base64 strings
                    //         name: 'images/[hash]-[name].[ext]'
                    //     } 
                    // }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.scss', '.css', '.sass']
    },
}