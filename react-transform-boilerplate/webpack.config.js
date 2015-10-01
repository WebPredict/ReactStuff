var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
        {
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loaders: [
                'url?limit=8192&minetype=image/png'
            ],
            include:path.join(__dirname, 'src')

        },
        {
            test: /\.css$/,
            loader: "style-loader!css-loader",
            include: path.join(__dirname, 'src')
        }
       ]
  }
};
