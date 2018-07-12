// Webpack Configuration
// Based on: https://github.com/postNirjhor/webpack-boilerplate/blob/master/webpack.config.js
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        main: "./src/js/app.js"
    },

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "./js/app.js",
    },

    module: {
        rules: [
            // babel-loader with "env" preset
            {
                test: /\.js$/,
                // include: /src/,
                include: [path.resolve(__dirname, "src", "js")],
                // exclude node_modules JS
                exclude: [/node_modules/],
                use: {
                    loader: "babel-loader",
                }
            },
            // html-loader
            {
                test: /\.html$/,
                include: [path.resolve(__dirname, "src", "html")],
                use: ["html-loader"]
            },
            // sass-loader with sourceMap activated
            {
                test: /\.scss$/,
                include: [path.resolve(__dirname, "src", "scss")],
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                minimize: true
                            }
                        },
                        {
                            loader: "postcss-loader"
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            // file-loader(for images)
            {
                test: /\.(jpg|png|gif|svg)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "./assets/media/"
                    }
                }]
            },
            // file-loader(for fonts)
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ["file-loader"]
            }
        ]
    },

    plugins: [
        // Cleaning up only "dist" folder
        new CleanWebpackPlugin("dist", {} ),
        new ExtractTextPlugin({
            filename: "./css/app.css",
            disable: false,
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: "./src/html/index.html",
            filename: "index.html"
        })
    ],

    devServer: {
        // Static files served from here
        contentBase: path.resolve(__dirname, "./dist/assets/media"),
        compress: true,
        // Open app using localhost:2000
        port: 2000,
        stats: "errors-only",
        open: true
    },

    devtool: "source-map"
};
