export default function (stream, io) {
  // create a socket.io connection with the client
  io.on('connection', function (socket) {
    console.log('User connected. Socket id %s', socket.id);

    socket.on('disconnect', function () {
      console.log('User disconnected. %s. Socket id %s', socket.id);
    });
  });
  // When tweets get sent our way ...
  stream.on('tweet', function (tweet) {
    console.log(tweet.text);
    io.sockets.emit('tweet', tweet.text);
  });
  stream.on('error', function (error) {
    throw error;
  });
}
