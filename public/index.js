"use strict";

import path from 'path';
import express from 'express';
import webpack from 'webpack';
import history from 'connect-history-api-fallback';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../webpack/webpack.dev.config.babel.js';

const port = process.env.PORT || 3000;
const ip = process.env.IP || 'localhost';

const app = express();
const compiler = webpack(config);

app.use(history());

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
}));

app.use(webpackHotMiddleware(compiler));

app.use('/static', express.static('public'));

app.get('*', (req, res) => res.sendFile(path.join( __dirname, 'index.html')));

app.listen( port, ip, error => {
  if (error) throw error;

  /*eslint-disable no-console */
  console.info(`Listening on port ${port}. Open up http://${ip}:${port}/ in your browser.`);
  /*eslint-enable no-console */
});
