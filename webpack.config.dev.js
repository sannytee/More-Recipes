import webpack from 'webpack';
import path from 'path';
import Dotenv from 'dotenv-webpack';

export default {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    './client/index'
  ],
  target: 'web',
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new Dotenv()
  ],
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loaders: ['babel-loader'],
        include: path.join(__dirname, '/client'),
      },
      {
        test: /(\.s?css)$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.woff2(\?\S*)?$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.woff(\?\S*)?$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=100000&mimetype=application/octet-stream'
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: './images/[hash].[ext]',
          },
        },
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
};
