import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import PurifyCSSPlugin from 'purifycss-webpack';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import glob from 'glob';

const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production')
};

export default {
    debug: false, // display debug information
    noInfo: false,// webpack displays all list of files its bundling in CLI,devs use with preferably true, default is false.
    entry: {
        main: './src/main'// order is critical this has to be last.
    },
    target: 'web',// the way webpack bundles the code for web/node. web sets it for browswer specification
    output: {
        path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
        publicPath: '/',
        filename: '[name].[chunkhash:8].js',
        chunkFilename: '[name].[chunkhash:8].chunk.js'
    },
    context: __dirname,
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin(GLOBALS),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 15 }),
        new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            sourceMap: false,
            mangle: true,
            minimize: true,
            compress: {
                sequences: true,
                booleans: true,
                loops: true,
                unused: true,
                warnings: false,
                drop_console: true,
                unsafe: true,
                dead_code: true
            },
            output: {
                comments: false,
                screw_ie8: true
            },
            exclude: [/\.min\.js$/gi]
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
        new webpack.NoErrorsPlugin(),
        new OptimizeCssAssetsPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'src/index.html')),
            moduleExtensions: ['.html', '.js'],
            purifyOptions: {
                min: true,
                info: false
            }
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new ExtractTextPlugin('[name].[contenthash:8].css', {
            allChunks: true
        }),
        new ManifestPlugin({
            fileName: 'asset-manifest.json'
        })
    ],
    module: {
        loaders: [
            { test: /\.js$/, include: path.join(__dirname, 'src'), loaders: ['babel'] },
            {
                test: /\.woff?(\?\S*)?$/, loader: "url-loader?limit=100000&mimetype=application/font-woff", options: { name: '[path][name].[hash:8].[ext]' }
            },
            { test: /\.woff(2)?(\?\S*)?$/, loader: "url-loader?limit=100000&mimetype=application/font-woff", options: { name: '[path][name].[hash:8].[ext]' } },
            { test: /\.ttf(\?\S*)?$/, loader: "url-loader?limit=100000&mimetype=application/x-font-ttf", options: { name: '[path][name].[hash:8].[ext]' } },
            { test: /\.(eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader", options: { name: '[path][name].[hash:8].[ext]' } },
            { test: /\.gif/, loader: "url-loader?limit=100000&mimetype=image/gif", options: { name: '[path][name].[hash:8].[ext]' } },
            { test: /\.jpg/, loader: "url-loader?limit=100000&mimetype=image/jpg", options: { name: '[path][name].[hash:8].[ext]' } },
            { test: /\.png$/, loader: "url-loader?limit=100000&mimetype=image/png", options: { name: '[path][name].[hash:8].[ext]' } },
            { test: /\.ico$/, loader: 'file-loader', options: { name: '[path][name].[hash:8].[ext]' } },
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
