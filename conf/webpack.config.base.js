/* eslint-disable */
const path = require('path');

const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
    template: 'public/index.html',
    filename: 'index.html',
});

module.exports = {
    entry: [path.resolve(__dirname, '../src', 'index.tsx')],
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
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000, // Convert images < 10kb to base64 strings
                            name: '[name]-[hash].[ext]',
                            outputPath: 'images',
                        },
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                exclude: /images/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[hash].[ext]',
                            outputPath: 'fonts',
                        },
                    },
                ],
            },
        ],
    },
};
