/* eslint-disable */
const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html',
});

module.exports = {
    entry: ['webpack/hot/only-dev-server', path.resolve(__dirname, '../src', 'index.tsx')],
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'app.min.js',
        hotUpdateChunkFilename: '__hmr/hot-update.js',
        hotUpdateMainFilename: '__hmr/hot-update.json',
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
    },

    plugins: [htmlPlugin],

    module: {
        rules: [
            {
                test: /\.(ts|js|tsx|jsx)$/,
                exclude: /node_modules/,

                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                        },
                    },
                    {
                        loader: 'ts-loader',
                    },
                ],
            },
            {
                enforce: 'pre',
                test: /\.(ts|js|tsx|jsx)$/,
                exclude: /node_modules/,

                loader: 'eslint-loader',
                options: {
                    emitWarning: true,
                },
            },
        ],
    },
};
