const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'react_minesweeper.jsx'),
  watch: true,
  output: {
    path: path.resolve(__dirname),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env', '@babel/react'],
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
};
