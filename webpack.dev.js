const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');

const config = {
  devServer: {
    open: true,
    historyApiFallback: true,
    port: 8081,
  },
  mode: 'development',
  devtool: 'eval',
};

module.exports = merge(common, config);
