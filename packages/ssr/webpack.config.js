const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const commonConfig = {
  mode: "development",
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
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};

const clientConfig = {
  ...commonConfig,
  name: "client",
  entry: path.resolve(__dirname, "client/index.tsx"),
  output: {
    path: path.resolve(__dirname, "dist/client"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "client/index.html",
    }),
  ],
};

const serverConfig = {
  ...commonConfig,
  name: "server",
  target: "node",
  entry: path.resolve(__dirname, "server/index.tsx"),
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/server"),
  },
};

module.exports = [commonConfig, clientConfig, serverConfig];
