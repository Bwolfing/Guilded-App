var isDevBuild = process.argv.indexOf("--env.prod") < 0;
var path = require("path");
var merge = require("webpack-merge");
var webpack = require("webpack");
var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    resolve: {
        extensions: [".js", ".ts",],
    },
    entry: {
        main: path.join(__dirname, "app", "main.ts"),
    },
    output: {
        path: path.join(__dirname, "public"),
        filename: "[name].js",
    },
    module: {
        loaders: [
            { test: /\.ts$/, include: /app/, loader: "ts-loader", query: { silent: true, }},
            { test: /\.html$/, loader: "raw-loader", },
            { test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)(\?|$)/, loader: "url-loader?limit=100000", },
            { test: /\.scss$/, exclude: /node_modules/, loaders: ["raw-loader", "sass-loader"], },
        ],
    },
    devtool: isDevBuild ? "inline-source-map" : null,
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(path.join(__dirname, "public", "vendor-manifest.json")),
        })
    ].concat(isDevBuild ? [] : [
        new webpack.optimize.OccurrenceOrderPlugin(),
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