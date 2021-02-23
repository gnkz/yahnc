const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [{ test: /\.(js|jsx)$/, use: 'babel-loader' }],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'src/index.html',
    }),
    new CopyPlugin({ patterns: [{ from: '_redirects' }] }),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
