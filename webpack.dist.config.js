
const webpack = require('webpack')

let config = require('./webpack.config.js')

config.output.filename = 'link.min.js'
config.plugins.push(new webpack.optimize.UglifyJsPlugin())

module.exports = config
