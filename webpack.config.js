const path = require('path');
const webpack = require('webpack');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

const isProd = process.env.NODE_ENV === 'PRODUCTION';

const buildDir = 'build';
const extensions = ['.js', '.jsx', '.ts', '.tsx', '.wasm'];
const alias = {
  '@src': path.resolve(__dirname, 'src'),
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
  entry: './src/index.ts',
  resolve: {
    extensions,
    alias,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        oneOf: [
          {
            test: /\.module\.s[ac]ss$/,
            use: [MiniCssExtractPlugin.loader, cssLoader, postcssLoader, 'sass-loader'],
            exclude: /node_modules/,
          },
          {
            use: [MiniCssExtractPlugin.loader, 'css-loader', postcssLoader, 'sass-loader'],
            exclude: /node_modules/,
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.join(__dirname, buildDir),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack',
      template: './src/index.html',
      filename: 'index.html',
      minify: isProd
        ? {
            removeComments: true,
            useShortDoctype: true,
          }
        : false,
    }),
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[contenthash].css',
    }),
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
