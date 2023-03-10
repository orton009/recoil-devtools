const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    popup: path.resolve(__dirname, "./src/popup.js"),
    contentScript: path.resolve(__dirname, "./src/contentScript.js"),
    devtools: {
      import: path.resolve(__dirname, "./src/devtools/devtools.js"),
      filename: "../devtools.js",
    },
    devtoolsController: path.resolve(__dirname, "./src/devtools/controller.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 9000,
    hot: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "Welcome to sivaraj-v github ",
      template: "./src/popup.html",
      filename: "./popup.html",
      meta: {
        viewport: "width=device-width, initial-scale=1.0",
        charset: "UTF-8",
      },
    }),
    new HtmlWebpackPlugin({
      title: "Recoil Devtools",
      template: "./src/devtools/devtools.html",
      filename: "../devtools.html",
      meta: {
        viewport: "width=device-width, initial-scale=1.0",
        charset: "UTF-8",
      },
    }),
    new webpack.ProgressPlugin({ percentBy: "entries" }),
    new MiniCssExtractPlugin({
      filename: `[name].css`,
    }),
  ],
};
