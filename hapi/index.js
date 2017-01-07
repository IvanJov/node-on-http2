const hapi = require('hapi');
const http2 = require('http2');
const fs = require('fs');

const options = {
  key: fs.readFileSync(__dirname + '/../certificate/server.key'),
  cert:  fs.readFileSync(__dirname + '/../certificate/server.crt')
};

const server = new hapi.Server();
server.connection({
  listener: http2.createServer(options),
  host: 'localhost',
  port: 3000,
  tls: true
});

server.route({
  method: 'GET',
  path:'/',
  handler: (req, res) => {

    return res('Serving using HTTP2!');
  }
});

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});