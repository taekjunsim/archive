const path = require("path");
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
