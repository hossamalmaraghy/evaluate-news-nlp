const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const WorkboxPlugin = require('workbox-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),  // Output directory
        filename: 'bundle.js',  // Name of the bundled file
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [
                  'style-loader', // injects CSS to the DOM
                  'css-loader', // translates CSS into CommonJS
                  'sass-loader', // compiles Sass to CSS
                ],
              },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
        }),
        new WorkboxPlugin.GenerateSW(),
        new CleanWebpackPlugin(),  // Clean dist folder before every build        
    ],
    devServer: {
        port: 3000,
        allowedHosts: 'all'
    }
}
