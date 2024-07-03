const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackAssetsManifest = require("webpack-assets-manifest");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");

const isEnvDevelopment = process.env.NODE_ENV === "development";

const commonConfig = {
  mode: isEnvDevelopment ? "development" : "production",
  stats: "errors-warnings",
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
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: require.resolve("css-loader"),
            options: {
              importLoaders: 1,
            },
          },
        ],
      },
      {
        test: /\.module\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: require.resolve("css-loader"),
            /**
             * TODO
             * 상황: module.css가 적용이 안됨
             * 원인: 빌드를 하면 기존의 클래스 명이 고유한 클래스 명으로 변환되는데, 이로 인해 html의 클래스 명과 css의 클래스 명이 매핑되지 않음
             * 해결방법
             *  1. CSS만을 사용한다.
             *  2. Next.js v13을 사용한다.
             *  3. CSR로 구현하되 로딩 최적화의 방법을 찾는다.
             */
            options: {
              importLoaders: 1,
              modules: {
                mode: "local",
                getLocalIdent: getCSSModuleLocalIdent,
              },
            },
          },
        ],
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
