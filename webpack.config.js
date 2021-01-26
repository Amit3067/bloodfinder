const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config={
    entry: "./src/index.js",
    output: {
        filename: "index.min.js",
        path: path.resolve(__dirname,'dist')
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                type: "asset/resource"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            template: './public/index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './public/assets',
                    globOptions: {
                        dot: true,
                        gitignore: true,
                        ignore: ['**/*.html']
                    },
                    to: path.resolve('./dist/assets')
                }
            ]
        })
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname,'public'),
        hot: true,
        port: 3000,
        open: true,
        openPage: "/index.html"
    }
}
module.exports= config;