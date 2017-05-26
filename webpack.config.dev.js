import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('development')
};

export default {
  debug: true, // display debug information
  devtool: 'inline-source-map',
  noInfo: false,// webpack displays all list of files its bundling in CLI,devs use with preferably true, default is false.
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    './src/main'// order is critical this has to be last.
  ],
  target: 'web',// the way webpack bundles the code for web/node. web sets it for browswer specification
  output: {
    path: __dirname + '/src', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  lazy: true,
  devServer: {
    contentBase: './src'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('bundle.css', {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    })
  ],
  module: {
    loaders: [
      { test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel'] },
      { test: /\.woff?(\?\S*)?$/, loader: "url-loader?limit=100000&mimetype=application/font-woff" },
      { test: /\.woff(2)?(\?\S*)?$/, loader: "url-loader?limit=100000&mimetype=application/font-woff" },
      { test: /\.ttf(\?\S*)?$/, loader: "url-loader?limit=100000&mimetype=application/x-font-ttf&name=[path][name].[ext]" },
      { test: /\.(eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
      { test: /\.gif/, loader: "url-loader?limit=100000&mimetype=image/gif" },
      { test: /\.jpg/, loader: "url-loader?limit=100000&mimetype=image/jpg" },
      { test: /\.png$/, loader: "url-loader?limit=100000&mimetype=image/png" },
      { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' },
      { test: /(\.css)$/, loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader']) },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader', 'sass-loader']) }
    ]
  },
  postcss: function () {
    return [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9'
        ]
      })
    ];
  }
};
