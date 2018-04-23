var express = require("express");
var app = express();
app.use('/',require('connect-history-api-fallback')());
app.use('/',express.static('public'));
if (process.env.NODE_ENV !== 'production')
{
    var webpack = require('webpack');
    var webpackConfig = require('./build/webpack.config.js');
    var webpackCompiled = webpack(webpackConfig);
    // 配置运行时打包
    var webpackDevMiddleWare = require('webpack-dev-middleware');
    app.use(webpackDevMiddleWare(webpackCompiled,{
        publicPath: "/",
        stats:{colors: true},
        lazy: false,
        watchOptions:{
            aggregateTimeout: 300,
            poll: true
        },
    }));
    // 配置热更新
    var webpackHotMiddleWare = require('webpack-hot-middleware');
    app.use(webpackHotMiddleWare(webpackCompiled));
}

var server = app.listen(2000,function()
{
    var port = server.address().port;
    console.log("Open http://localhost:%s",port)
});