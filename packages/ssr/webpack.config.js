const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackAssetsManifest = require("webpack-assets-manifest");

const commonConfig = {
  mode: "production",
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, "css-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackAssetsManifest({
      output: "asset-manifest.json",
      publicPath: true, // optional: include full public paths in the manifest
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:8].css",
      chunkFilename: "static/css/[name].[contenthash:8].chunk.css",
    }),
  ],
};

const clientConfig = {
  ...commonConfig,
  name: "client",
  entry: path.resolve(__dirname, "src/client/index.tsx"),
  output: {
    path: path.resolve(__dirname, "dist/client"),
  },
};

const serverConfig = {
  ...commonConfig,
  name: "server",
  target: "node",
  entry: path.resolve(__dirname, "src/server/index.tsx"),
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/server"),
  },
};

module.exports = [commonConfig, clientConfig, serverConfig];
