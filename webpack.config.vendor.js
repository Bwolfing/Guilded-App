var isDevBuild = process.argv.indexOf("--env.prod") < 0;
var path = require("path");
var merge = require("webpack-merge");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extractCss = new ExtractTextPlugin("vendor.css");
var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

var _assetsPath = path.join(__dirname, "assets");

module.exports = {
    resolve: {
        extensions: [".js"],
    },
    module: {
        loaders: [
            { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)(\?|$)/, loader: "url-loader?limit=100000", },
            { test: /\.css(\?|$)/, loader: extractCss.extract(["css-loader",]) },
            { test: /\.scss$/, loaders: extractCss.extract(["raw-loader", "sass-loader"]) },
        ],
        // Silences warning, found answer here: http://bit.ly/2mBnmg2
        exprContextCritical: false,
    },
    output: {
        path: path.join(__dirname, "public"),
        filename: "[name].js",
        library: "[name]_[hash]",
    },
    entry: {
        vendor: [
            "@angular/common",
            "@angular/compiler",
            "@angular/core",
            "@angular/http",
            "@angular/material",
            "@angular/material/core/theming/prebuilt/deeppurple-amber.css",
            "@angular/platform-browser",
            "@angular/platform-browser-dynamic",
            "@angular/router",
            "@nglibs/meta",
            "angular2-jwt",
            "angular2-universal",
            "angular2-universal-polyfills",
            "bootstrap",
            "es6-shim",
            "es6-promise",
            "hammerjs",
            "jquery",
            "ng-semantic",
            path.join(_assetsPath, "semantic", "dist", "semantic.min.css"),
            path.join(_assetsPath, "semantic", "dist", "semantic.js"),
            path.join(_assetsPath, "css", "font-awesome.css"),
            path.join(_assetsPath, "css", "semantic-ui-override.scss"),
        ],
    },
    plugins: [
        extractCss,
        new webpack.ProvidePlugin({ $: "jquery", jQuery: "jquery" }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DllPlugin({
            path: path.join(__dirname, "public", "[name]-manifest.json"),
            name: "[name]_[hash]",
        })
    ].concat(isDevBuild ? [] : [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false, },
            include: /\.js$/
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/,
            cssProcessorOptions: { discardComments: { removeAll: true } },
        })
    ]),
};
