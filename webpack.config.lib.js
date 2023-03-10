const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: path.resolve(__dirname, "./src/queryInject.js"),
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "index.js",
    library: {
      type: "umd",
    },
    libraryTarget: "umd",
  },
  optimization: {
    minimize: false,
  },
  externals: {
    // Use external version of React
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "React",
      umd: "react",
      module: "react",
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "react-dom",
      root: "ReactDOM",
      umd: "react-dom",
      module: "react-dom",
    },
    recoil: {
      commonjs: "recoil",
      commonjs2: "recoil",
      amd: "recoil",
      root: "Recoil",
      umd: "recoil",
      module: "recoil",
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
