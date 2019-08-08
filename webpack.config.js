const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PROD = 'production';
const DEV = 'development';

const htmlPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html',
});

const cssPlugin = new MiniCssExtractPlugin({
    filename: 'main.css',
    chunkFilename: 'main-chunk.css',
});

module.exports = env => {
    const mode = env && env.NODE_ENV === PROD ? PROD : DEV;
    console.log('MODE', mode);
    return {
        mode,
        devtool: mode !== PROD ? 'inline-source-map' : 'source-map',
        entry: ['webpack/hot/only-dev-server', path.resolve(__dirname, 'src', 'index.tsx')],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'app.js',
            hotUpdateChunkFilename: '__hmr/hot-update.js',
            hotUpdateMainFilename: '__hmr/hot-update.json',
        },
        resolve: {
            extensions: ['.ts', '.js', '.tsx', '.jsx'],
        },
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
                        {
                            loader: 'eslint-loader',
                        },
                    ],
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: mode !== PROD ? 'style-loader' : MiniCssExtractPlugin.loader,
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
                            },
                        },
                    ],
                },
            ],
        },
        plugins: [htmlPlugin, cssPlugin, new webpack.HotModuleReplacementPlugin()],
        devServer: {
            contentBase: './dist',
            publicPath: '/',
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
    };
};
