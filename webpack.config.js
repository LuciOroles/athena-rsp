const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpackMerge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);
const presetConfig = require("./build-utils/loadPresets");

module.exports = ({ mode, presets } = { mode: "production", presets: [] }) => {
  return webpackMerge(
    {
      mode,
      devServer: {
        port:1919
      },
      module: {
        rules: [
          {
            test: /\.(png|jpe?g)$/,
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
          },
          {
            test: /\.html$/,
            use: {
                loader: 'html-loader',
                options: {}
            }
         },
          {
            test: /\.css$/,
            use:  {
              loader:'style-loader'
            }

              , 
            // 'css-loader'],
          },
        ]
      },
      entry: {
              d3:'./src/d3main.js',
              d3line:'./src/d3line.chart.js',
              i2:'./src/i2.js',
              i3: './src/i3.js',
              mmonad: './src/maybeMonadImplementation.js',
              progress: './src/promises/promiseProgressBar.js',
              hsh1: './src/hesehus/hsh1.js',
              hsh2: './src/hesehus/hsh2.js',
              hsh3: './src/hesehus/hsh3.js',
              hsh4: './src/hesehus/hsh4.js'
            } ,
      output: {
        filename: "[name].bundle.js"
      },
      
      plugins: [ 
        
        new HtmlWebpackPlugin({
          filename: 'test1.html',
          chunks: ['d3line']
        }),
        new HtmlWebpackPlugin({
          filename: 'test2.html',
          chunks: ['i2']
        }),
        new HtmlWebpackPlugin({
          filename: 'test3.html',
          chunks: ['i3']
        }),
        new HtmlWebpackPlugin({
          filename: 'maybeMonad.html',
          template: 'src/maybeMonad.html',
          chunks: ['mmonad']
        }),
        new HtmlWebpackPlugin({
          filename: 'promiseProgressBar.html',
          template: 'src/promiseProgressBar.html',
          chunks: ['progress']
        }),
        new HtmlWebpackPlugin({
          filename: 'hesehus2.html',
          template: 'src/hesehus2.html',
          chunks: ['hsh2']
        }),
        new HtmlWebpackPlugin({
          filename: 'hesehus4.html',
          template: 'src/hesehus4.html',
          chunks: ['hsh4']
        }),
        // new MiniCssExtractPlugin(),

        // new CopyWebpackPlugin([{from: './src/index.html', to: 'index.html', toType: 'file' }]),

      new webpack.ProgressPlugin()]
    },
    modeConfig(mode),
    presetConfig({ mode, presets })
  );
};