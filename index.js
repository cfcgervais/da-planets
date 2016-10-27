let express = require('express'),

  bodyParser = require('body-parser'),
  cors = require('cors'),
  routes = require('./server-assets/routes/index'),
  handlers = require('./utils/handlers'),
  server = express(),
  http = require('http').Server(server),
  io = require('socket.io')(http),
  port = process.env.PORT || 1582

//Registers Middleware for server
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use('/', express.static(`${__dirname}/public/planets/`));
server.use('/api', cors(handlers.corsOptions), routes.router)
server.use('/', handlers.defaultErrorHandler)

io.on('connection', function (socket) {
  console.log('Heyyyyyyyy');

  // setInterval(() => {
  //   io.emit('update', 'The time is: ' + new Date().getTime());
  // }, 1000);
});

http.listen(port, function () {
  console.log(`Creating worlds on port: ${port}`);
})