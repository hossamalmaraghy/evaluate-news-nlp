const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',  // For easier debugging in development
    stats: 'verbose',       // Gives detailed output
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],  // Enables live style injection
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "index.html",
        }),
        new CleanWebpackPlugin({
            dry: true, // Simulates the clean without actually removing files; useful in development
            verbose: true,
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false,
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    devServer: {
        port: 3002,
        allowedHosts: 'all',
        hot: true,  // Enables Hot Module Replacement for faster development
    },
    cache: {
        type: 'memory',  // Faster builds with in-memory caching
    },
};
