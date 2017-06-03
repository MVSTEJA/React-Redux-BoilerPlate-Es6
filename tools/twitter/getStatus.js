console.log('The bot is starting');

const Twit = require('twit');

const config = require('./getStatusconfig').default;

function handleStreaming() {
  console.log('handleStreaming', config);
  const T = new Twit(config);

  const params = {
    q: ['champions trophy 2017', 'cricket champions trophy', 'champions trophy india']
  };
  const stream = T.stream('statuses/filter', { track: params.q })
  stream.on('tweet', function (tweet) {
    console.log(tweet.text);
  });
}

function getTweetStatus(statusFlag) {
  if (statusFlag) {
    return handleStreaming();
  }
  console.log('Nothing to stream');
  return;
}

// getTweetStatus(true);

export default getTweetStatus;
