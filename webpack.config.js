const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

const env = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
  mode: env,
  entry: [
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, 'src', 'index.jsx')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
    hotUpdateChunkFilename: '__hmr/hot-update.js',
    hotUpdateMainFilename: '__hmr/hot-update.json'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          }
        }
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [htmlPlugin, new webpack.HotModuleReplacementPlugin()],
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
      poll: 1000
    }
  },
};
