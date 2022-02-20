const path = require('path');
const webpack = require('webpack');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

const isProd = process.env.NODE_ENV === 'PRODUCTION';

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.wasm'];
const alias = {
  '@src': path.resolve(__dirname, 'src'),
  '@react': path.resolve(__dirname, 'custom_modules/react'),
  '@router': path.resolve(__dirname, 'custom_modules/router'),
  '@api': path.resolve(__dirname, 'custom_modules/api'),
  '@redux': path.resolve(__dirname, 'custom_modules/redux'),
};

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      config: path.resolve(__dirname, 'postcss.config.js'),
    },
  },
};

const cssLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
  },
};

module.exports = {
  resolve: {
    extensions,
    alias,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        oneOf: [
          {
            test: /\.module\.s[ac]ss$/,
            use: [
              isProd ? MiniCssExtractPlugin.loader : 'style-loader',
              cssLoader,
              postcssLoader,
              'sass-loader',
            ],
            exclude: /node_modules/,
          },
          {
            use: [
              isProd ? MiniCssExtractPlugin.loader : 'style-loader',
              'css-loader',
              postcssLoader,
              'sass-loader',
            ],
            exclude: /node_modules/,
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { import: true },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.DefinePlugin({
      IS_PRODUCTION: isProd,
    }),
    new WasmPackPlugin({
      crateDirectory: './wasm_module',
    }),
  ],
  experiments: {
    syncWebAssembly: true,
    asyncWebAssembly: true,
  },
};
