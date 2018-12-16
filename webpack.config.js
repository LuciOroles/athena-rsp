const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpackMerge = require("webpack-merge");

const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);
const presetConfig = require("./build-utils/loadPresets");

module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
  return webpackMerge(
    {
      mode,
      module: {
        rules: [
          {
            test: /\.jpe?g$/,
            use: [
              {
                loader: "url-loader",
                options: {
                  limit: 5000
                }
              }
            ]
          },
          {
                test: /\.svg/,
                use: {
                    loader: 'svg-url-loader',
                    options: {}
                }
          }
        ]
      },
      output: {
        filename: "bundle.js"
      },
      //new HtmlWebpackPlugin(),
      plugins: [ 
      new CopyWebpackPlugin([{from: './src/index.html', to: 'index.html', toType: 'file' }]),
      new webpack.ProgressPlugin()]
    },
    modeConfig(mode),
    presetConfig({ mode, presets })
  );
};