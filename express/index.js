const express = require('express');
const spdy = require('spdy');
const fs = require('fs');

const app = express();

app.get('/', function (req, res) {
  res.send('Serving using HTTP2!');
});

const options = {
  key: fs.readFileSync(__dirname + '/../certificate/server.key'),
  cert:  fs.readFileSync(__dirname + '/../certificate/server.crt')
};

spdy
  .createServer(options, app)
  .listen(3000, (err) => {
    if (err) {
      throw new Error(err);
    }

    console.log('Listening on port: ' + 3000 + '.');
  });