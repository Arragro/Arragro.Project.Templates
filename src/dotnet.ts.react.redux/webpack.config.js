const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

module.exports = (env) => {

    const isDevBuild = !(env && env === 'prod');

    let config = {
        devtool: 'source-map',
        // devServer: {
        //     contentBase: path.join(__dirname, "wwwroot", "dist"),
        //     compress: true,
        //     port: 9000
        // },
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            plugins: [
                new TsConfigPathsPlugin(/* { tsconfig, compiler } */)
            ]
        },
        module: {
            loaders: [
                {
                    test: /\.ts(x?)$/,
                    include: /ReactApp/,
                    exclude: [
                        /node_modules/,
                        /obj/
                    ],
                    loader: 'awesome-typescript-loader',
                    query: {
                        useBabel: true,
                        useCache: true
                    }
                },
                { 
                    test: /\.scss?/, 
                    exclude: /node_modules/, 
                    use: [
                        'css-hot-loader'                        
                    ].concat(ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'postcss-loader', 'sass-loader']}))
                },
                {
                  test: /\.css$/,
                  include: /ReactApp/,
                  use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { 
                          loader: 'css-loader',
                          query: {
                            modules: true,
                            sourceMap: isDevBuild,
                            importLoaders: 1,
                            localIdentName: '[local]__[hash:base64:5]'
                          }
                        },
                        {
                          loader: 'postcss-loader'
                        }
                    ]
                  })
                },
                {
                  test: /\.css$/,
                  include: /node_modules/,
                  use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                  })
                },
                { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
                { test: /\.woff(\?\S*)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
                { test: /\.(ttf|eot|svg)(\?\S*)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
            ]
        },
        entry: {
            main: ['react-hot-loader/patch', './ReactApp/index.tsx'],
            vendor: ['react', 'react-dom']
        },
        output: {
            path: path.join(__dirname, 'wwwroot', 'dist'),
            filename: '[name].js',
            publicPath: '/dist/'
        },
        plugins: [
            new ExtractTextPlugin('main.css'),
            require('autoprefixer'),
            new webpack.optimize.OccurrenceOrderPlugin(),
        ].concat(
            isDevBuild ? [
            ] : [
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
                }),
                new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
                new webpack.optimize.UglifyJsPlugin(),
                new webpack.optimize.AggressiveMergingPlugin(),
                new CompressionPlugin({
                    asset: "[path].gz[query]",
                    //include: /\/wwwroot/,
                    algorithm: "gzip",
                    test: /\.js$|\.css$|\.svg$/,
                    threshold: 10240,
                    minRatio: 0.8
                }),
            ])
    }

    return config
};
