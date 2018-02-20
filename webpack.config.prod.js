const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  cache: true,
  entry: [
    path.join(__dirname, '/client/index.jsx')
  ],
  output: {
    path: path.join(__dirname, '/client/dist/'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new htmlWebpackPlugin({
      title: 'more-recipes',
      template: './client/index.html'
    }),
    new CleanWebpackPlugin(['client/dist']),
    new webpack.EnvironmentPlugin([
      'SECRET',
      'FIREBASE_MESSENGERID',
      'FIREBASE_APIKEY',
      'FIREBASE_URL',
      'FIREBASE_PROJECTID',
      'FIREBASE_STORAGEBUCKET',
      'FIREBASE_AUTHDOMAIN',
    ]),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      }
    })
  ],
  devServer: {
    contentBase: './client/dist'
  },
  target: 'web',
  devtool: 'source-map',
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
          loader: 'url-loader',
          options: {
            name: './images/[hash].[ext]',
          },
        },
      }
    ]
  },
  resolve: { extensions: ['.js', '.jsx', '.css'] },
  node: {
    dns: 'empty',
    net: 'empty',
    fs: 'empty'
  }
};
