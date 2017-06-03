/*eslint-disable no-var*/
/*eslint-disable no-console*/
var express = require('express');
const path = require('path');
const compression = require('compression');
import socket from 'socket.io';
const Twit = require('twit');
import getStatusconfig from './twitter/getStatusConfig';
import streamHandler from './twitter/streamHandler';

const port = 80;
const app = express();
const T = new Twit(getStatusconfig);
const params = {
  q: ['champions trophy 2017', 'cricket champions trophy', 'champions trophy india']
};

app.use(compression());

app.use(express.static(path.join(__dirname, '../dist')));

app.use('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(port, "0.0.0.0", function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log("Server started");
  }
});

const stream = T.stream('statuses/filter', { track: params.q });
streamHandler(stream, io);
