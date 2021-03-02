var webpack = require('webpack')

module.exports = {
  resolve: {
    extensions: [
      '',
      '.js',
      '.coffee'
    ]
  },
  entry: './src/index.coffee',
  output: {
    path: __dirname + '/dist/',
    filename: 'qj.js',
    library: 'qj',
    libraryTarget: 'var',
  },
  module: {
    loaders: [
      { test: /\.json/, loader: "json-loader" },
      { test: /\.coffee$/, loader: "coffee-loader" },
    ]
  }
};
