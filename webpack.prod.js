const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');

const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
  devtool: 'hidden-source-map',
  mode: 'production',
  plugins: [new CssMinimizerWebpackPlugin(), new CleanWebpackPlugin()],
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimize: true,
    minimizer: [new TerserWebpackPlugin()],
  },
};

module.exports = merge(common, config);
