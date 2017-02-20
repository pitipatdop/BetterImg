var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'sourcemap',
  entry: [
    './src/BetterImg.js',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    pathinfo: true,
    filename: 'index.js',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(`${process.env.NODE_ENV}`),
      },
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compressor: {
    //     warnings: false,
    //   },
    //   minimize: true,
    // }),
    // new webpack.NoEmitOnErrorsPlugin(),
  ],
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['babel-loader'], exclude: /node_modules/, include: __dirname },
    ],
  },
};
