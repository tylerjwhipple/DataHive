const express = require('express');
const postgraphql = require('postgraphql').postgraphql

const app = express()

app.use(postgraphql('postgres://postgres:amazon007@localhost:5432/postgres', 'healthcare', {graphiql: true}))

// Webpack runs as a middleware.  If any request comes in for the root route ('/')
// Webpack will respond with the output of the webpack process: an HTML file and
// a single bundle.js output of all of our client side Javascript
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');
app.use(webpackMiddleware(webpack(webpackConfig)));

module.exports = app;
