const path = require('path');
const webpack = require('webpack');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

const isProd = process.env.NODE_ENV === 'PRODUCTION';

const buildDir = 'build';
const viewDir = 'dist';

const extensions = ['.js', '.jsx', '.ts', '.tsx', '.wasm'];
const alias = {
  '@src': path.resolve(__dirname, 'src'),
  '@wasm': path.resolve(__dirname, 'wasm_module/pkg'),
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
  entry: isProd ? './index.ts' : './src/index.ts',
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
            use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', cssLoader, postcssLoader, 'sass-loader'],
            exclude: /node_modules/,
          },
          {
            use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', postcssLoader, 'sass-loader'],
            exclude: /node_modules/,
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: isProd ? path.join(__dirname, buildDir) : path.join(__dirname, viewDir),
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
    new webpack.HotModuleReplacementPlugin(),
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
