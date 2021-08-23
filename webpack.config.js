const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  devtool: "eval-source-map",
  entry: "./src/index.ts",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/dist",
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: "src", to: "src" }],
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3000,
    hot: true,
    writeToDisk: true,
  },
};
