var glob = require('glob');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

function getHtmlPlugin() {
    var buildPath = process.env.NODE_ENV == 'development' ? 'static/html/' : '';
    var plugins = [];
    glob.sync(process.cwd() + '/develop/view/**/*.ejs').forEach(function (name) {
        console.log(name)
        var n = name.match(/([^/]+?)\/([^/]+?)\.ejs/)[0].split(/\./)[0];
        console.log(buildPath,name,n)
        plugins.push(
            new HtmlWebpackPlugin({
                filename : buildPath + n + '.html',
                template : name,
                inject:false
            })
        )
    });
    // entry['a'] = 'webpack-dev-server/client?http://localhost:3000';
    // entry['b'] = 'webpack/hot/only-dev-server';
    console.log(plugins)
    return plugins;
}

module.exports.getHtmlPlugin = getHtmlPlugin;
