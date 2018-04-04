// Webpack Configuration
// Based on: https://github.com/postNirjhor/webpack-boilerplate/blob/master/webpack.config.js
const path = require("path"),
    CleanWebpackPlugin = require("clean-webpack-plugin"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

// Create the extract text plugin instance which is used below in the plugins section
const extractPlugin = new ExtractTextPlugin({
    filename: "./css/app.css"
});

const config = {
    // Absolute path for project root
    context: path.resolve(__dirname, "src"),

    entry: {
        // This is relative to context path above
        app: "./js/app.js"
    },

    output: {
        // Absolute path declaration for build output
        path: path.resolve(__dirname, "../src/main/resources/public"),
        filename: "./js/[name].bundle.js"
    },

    module: {
        rules: [
            // babel-loader with "env" preset
            {
                test: /\.js$/,
                // include: /src/,
                include: [path.resolve(__dirname, "src", "js")],
                exclude: [/node_modules/],
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env"]
                    }
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
                use: extractPlugin.extract({
                    use: [{
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ],
                    fallback: "style-loader"
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
        new CleanWebpackPlugin(["dist"]),
        new HtmlWebpackPlugin({
            template: "html/index.html"
        }),
        // extract-text-webpack-plugin instance
        extractPlugin
    ],

    devServer: {
        // Static files served from here
        contentBase: path.resolve(__dirname, "../src/main/resources/public/assets/media"),
        compress: true,
        // Open app using localhost:2000
        port: 2000,
        stats: "errors-only",
        open: true
    },

    devtool: "eval-source-map"
};

module.exports = config;
