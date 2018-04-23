var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = 
{
    entry:[
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      './app/index.js',
    ],
    output:
    {
        filename: '[name].js',
        path: path.resolve(__dirname,'../public')
    },
    module: 
    {
        rules: 
        [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['env', 'stage-0', 'react'],
                plugins: []
              }
            }
          },
          // {
          //   test:/\.css$/,
          //   use:['style-loader','css-loader']
          // }
          {
            test: /-m\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[path][name]-[local]-[hash:base64:5]'
                        }
                    }
                ]
            })
          },
          {
            test: /^((?!(-m)).)*\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader'
            })
          }
        ],
    },
    performance: 
    {
        hints: false,
    },
    optimization:
    {
      splitChunks: 
      {
        chunks: 'initial', // 只对入口文件处理
        cacheGroups: {
            vendor: { // split `node_modules`目录下被打包的代码到 `page/vendor.js && .css` 没找到可打包文件的话，则没有。css需要依赖 `ExtractTextPlugin`
                test: /node_modules\//,
                name: 'page/vendor',
                priority: 10,
                enforce: true
            },
            commons: { // split `common`和`components`目录下被打包的代码到`page/commons.js && .css`
                test: /common\/|components\//,
                name: 'page/commons',
                priority: 10,
                enforce: true
            }
        }
      },
      runtimeChunk: {
          name: 'page/manifest'
      }
    },
    plugins:
    [
      new ExtractTextPlugin('styles.css'),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ]
    
};