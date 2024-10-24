const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'source-map',  // Keep source maps for easier debugging
    stats: 'verbose',  // More detailed output of build stats
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']  // Chain of loaders for SASS/SCSS
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files (can be disabled later in real builds)
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        }),
        new webpack.HotModuleReplacementPlugin()  // Enable Hot Module Replacement for better dev experience
    ],
    devServer: {
        port: 3000,
        allowedHosts: 'all',  // Allow access from any network
        hot: true  // Enable Hot Module Replacement
    },
    cache: {
        type: 'memory',  // Enable caching for faster builds during development
    }
};