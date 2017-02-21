var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);

var DEV_FOLDER = 'dev';

app.use(require('webpack-dev-middleware')(compiler, {
  // noInfo: true,
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  noInfo: false,
  compress: true,
  stats: {
    assets: true,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
  },
  quiet: false,
  inline: false,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/img', express.static(DEV_FOLDER + '/img'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, DEV_FOLDER + '/index.html'));
});

app.listen(3000, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
