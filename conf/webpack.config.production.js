/* eslint-disable */
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cssPlugin = new MiniCssExtractPlugin({
    filename: 'main.css',
    chunkFilename: 'main-chunk.css',
});

module.exports = {
    mode: 'production',
    devtool: 'source-map',

    plugins: [cssPlugin],

    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
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
};
