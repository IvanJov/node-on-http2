const http2 = require('http2');
const koa = require('koa');
const _ = require('koa-route');
const fs = require('fs');

const app = koa();

app.use(_.get('/', function *(next) {
  this.body = 'Serving using HTTP2!';
  yield next;
}));

const options = {
  key: fs.readFileSync(__dirname + '/../certificate/server.key'),
  cert:  fs.readFileSync(__dirname + '/../certificate/server.crt')
};

http2
  .createServer(options, app.callback())
  .listen(3000, (err) => {
    if (err) {
      throw new Error(err);
    }

    console.log('Listening on port: ' + 3000 + '.');
  });