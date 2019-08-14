/* eslint-disable */
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const cssPlugin = new MiniCssExtractPlugin({
    filename: 'main.css',
    chunkFilename: 'main-chunk.css',
});

const minifyCSSDefaultOptions = {
    discardComments: {
        removeAll: true,
    },
    // Run cssnano in safe mode to avoid potentially unsafe transformations.
    safe: true,
};
const minifyCSS = ({ options = minifyCSSDefaultOptions }) =>
    new OptimizeCssAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: options,
        canPrint: true,
    });

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    
    optimization: {
        minimizer: [new TerserPlugin({ sourceMap: true })],
        namedChunks: true,
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    plugins: [cssPlugin, minifyCSS({})],

    module: {
        rules: [
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [
                    {
                        loader: 'img-loader',
                        options: {
                            plugins: [
                                require('imagemin-gifsicle')({
                                    interlaced: false,
                                }),
                                require('imagemin-mozjpeg')({
                                    progressive: true,
                                    arithmetic: false,
                                }),
                                require('imagemin-pngquant')({
                                    floyd: 0.5,
                                    speed: 2,
                                }),
                                require('imagemin-svgo')({
                                    plugins: [{ removeTitle: true }, { convertPathData: false }],
                                }),
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: false,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [require('autoprefixer')],
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: false,
                            data: '@import "config";',
                            includePaths: ['src/styles'],
                        },
                    },
                ],
            },
        ],
    },
};
