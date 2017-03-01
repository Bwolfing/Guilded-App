var isDevBuild = process.argv.indexOf("--env.prod") < 0;
var path = require("path");
var merge = require("webpack-merge");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extractCss = new ExtractTextPlugin("vendor.css");
var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    resolve: {
        extensions: [".js", ".ts"],
    },
    module: {
        loaders: [
            { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)(\?|$)/, loader: "url-loader?limit=100000", },
            { test: /\.css(\?|$)/, loader: extractCss.extract(["css-loader",]) },
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
            path.join(__dirname, "app", "vendor.ts"),
            "bootstrap/dist/css/bootstrap.css",
            "@angular/material/core/theming/prebuilt/deeppurple-amber.css",
            path.join(__dirname, "assets", "css", "font-awesome.css"),
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
