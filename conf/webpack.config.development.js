/* eslint-disable */
const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',

    entry: ['webpack/hot/only-dev-server'],

    devServer: {
        historyApiFallback: true,
        host: 'localhost',
        hot: true,
        inline: true,
        open: true,
        port: 8900,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000,
        },
    },

    plugins: [new webpack.HotModuleReplacementPlugin()],

    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                            data: '@import "config";',
                            includePaths: ['src/styles'],
                        },
                    },
                ],
            },
        ],
    },
};
