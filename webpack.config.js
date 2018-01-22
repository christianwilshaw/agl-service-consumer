var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');
var CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: {
        "dev/agl": "./source/src/webpack-entry/agl.js"
    },
    output: {
        path: path.join(__dirname, 'bundle'),
        filename: '[name].min.js',
        libraryTarget: 'var',
        library: 'agldevtest'
    },
    devServer: {
        inline: true,
        port: 3333,
        contentBase: './',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                ],
            },
            {
                test: /\.useable\.css$/,
                use: [
                    { loader: "style-loader/useable" },
                    { loader: "css-loader" },
                ],
            },
            {
                test: /\.html$/,
                use: [
                    { loader: "mustache-loader?noShortcut" }
                ]
            },
            {
                test: /\.jsexec$/,
                use: [
                    { loader: "script-loader" }
                ]
            }

        ]
    },
    plugins: [
        new WebpackNotifierPlugin()
    ],
    watchOptions: {
        poll: 1000
    }
};