const path = require('path');
const root = path.resolve(__dirname, '..')
const dotenv = require('dotenv').config()


module.exports = {
  target: 'node',
  entry: path.resolve(root, 'src/index.ts'),
  resolve: {
    extensions: ['.ts', '.js', '.html'],
    alias: {
      '@': path.resolve(root, 'src'),
      '@database': path.resolve(root, 'src/db'),
      '@libraries': path.resolve(root, 'src/libs'),
      '@middlewares': path.resolve(root, 'src/middlewares'),
      '@services': path.resolve(root, 'src/services'),
      '@types': path.resolve(root, 'src/types'),
      '@utilities': path.resolve(root, 'src/utils'),
    }
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(root, 'dist'),
  },
  mode: process.env.NODE_ENV || 'development',
};