const path = require('path');

const {
  NODE_ENV = 'development',
} = process.env;

module.exports = {
  entry: './src/index.ts',
  mode: NODE_ENV,
  target: 'node',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'dist/'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  }
}