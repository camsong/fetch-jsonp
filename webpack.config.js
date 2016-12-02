var path = require('path');

module.exports = {
  entry: {
    'fetch-jsonp': './src/fetch-jsonp.js',
    'fetch-jsonp-ie8': './src/fetch-jsonp-ie8.js'
  },
  output: {
    filename: '[name].js',
    path: './dist',
    libraryTarget: "umd",
  },
  module: {
    rules: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname, './src')
      ],
      loader: 'babel-loader'
    }]
  },
  resolve: {
    extensions: [".js"],
  }
};
