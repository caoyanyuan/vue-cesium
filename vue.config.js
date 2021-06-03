
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
 
const debug = process.env.NODE_ENV !== 'production'
let cesiumSource = './node_modules/cesium/Source'
let cesiumWorkers = '../Build/Cesium/Workers'
module.exports = {
    publicPath: '',
    devServer: {
        port: 8084,
        proxy: {
            "/api": {
              target: "http://168.1.35.26:8080",
              changeOrigin: true,
              pathRewrite: {
                '^/api': '/'
              }
            },
            "/ploservice": {
              target: "http://ploservice.pnr.sz:5001",
              changeOrigin: true,
              pathRewrite: {
                '^/ploservice': '/'
              }
            },
            "/layer115": {
              target: "http://192.168.102.115:8080",
              changeOrigin: true,
              pathRewrite: {
                '^/layer115': '/'
              }
            }
        }
    },
   
    configureWebpack: {
        output: {
            sourcePrefix: ' '
        },
        amd: {
            toUrlUndefined: true
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': path.resolve('src'),
                'components': path.resolve('src/components'),
                'common': path.resolve('src/common'),
                'base': path.resolve('src/views'),
                'cesium': path.resolve(__dirname, cesiumSource)
            }
        },
        plugins: [
            new CopyWebpackPlugin([ { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers'}]),
            new CopyWebpackPlugin([ { from: path.join(cesiumSource, 'Assets'), to: 'Assets'}]),
            new CopyWebpackPlugin([ { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets'}]),
            new CopyWebpackPlugin([ { from: path.join(cesiumSource, 'ThirdParty/Workers'), to: 'ThirdParty/Workers'}]),
            new webpack.DefinePlugin({
                CESIUM_BASE_URL: JSON.stringify('./')
            })
        ]
    }
}
