const HtmlPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: "development",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },


    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file-loader',

            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
        ]
    },

    plugins: [
        new HtmlPlugin({
            filename: "index.html",
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin()
    ],

    devServer: {
        historyApiFallback: true,
    }
}