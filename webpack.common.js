const path = require('path');
require('dotenv').config();

const entries = {};
process.env.ENTRIES.split(',').map(entry => entries[entry.split(':')[0]] = entry.split(':')[1]);

module.exports = {
  entry: entries,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};
