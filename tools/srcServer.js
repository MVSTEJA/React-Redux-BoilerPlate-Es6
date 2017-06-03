import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import socket from 'socket.io';
const Twit = require('twit');
import getStatusconfig from './twitter/getStatusConfig';
import streamHandler from './twitter/streamHandler';
/* eslint-disable no-console */

const port = 3030;
const app = express();
const compiler = webpack(config);
const T = new Twit(getStatusconfig);
const params = {
  q: ['champions trophy 2017', 'cricket champions trophy', 'champions trophy india']
};

let devMiddleware = require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
});

app.use(devMiddleware);

app.use(require('webpack-hot-middleware')(compiler));

app.use(function (req, res, next) {
  const reqPath = req.url;
  const file = reqPath.split('/')[reqPath.split('/').length - 1];
  if (['bundle.js', 'index.html'].indexOf(file) !== -1) {
    res.end(devMiddleware.fileSystem.readFileSync(path.join(config.output.path, file)));
  } else if (file.indexOf('.') === -1) {
    res.end(devMiddleware.fileSystem.readFileSync(path.join(config.output.path, 'index.html')));
  } else {
    next();
  }
});

const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});

const stream = T.stream('statuses/filter', { track: params.q });
streamHandler(stream, io);
