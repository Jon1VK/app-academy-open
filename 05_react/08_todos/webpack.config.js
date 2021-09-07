const path = require('path');

module.exports = {
  mode: 'development',
  entry: './frontend/todo_redux.jsx',
  output: {
    path: path.resolve(__dirname, 'public', 'javascripts'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        include: path.resolve(__dirname, 'frontend'),
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
    extensions: ['.json', '.js', '.jsx'],
  },
  devtool: 'source-map',
};
