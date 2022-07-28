#!/usr/bin/env node

/**
 * Read environment variables
 */
 require('dotenv').config();

 /**
  * Believe it or not, reading process.env is expensive in NODE.js
  * https://github.com/nodejs/node/issues/3104
  * We want to cache process.env to a regular object since we don't expect it to change at runtime anyway.
  */
 process.env = JSON.parse(JSON.stringify(process.env));
 
 /**
  * Module dependencies.
  */
 
 const app = require('./app');
 const debug = require('debug')('nert:server');
 const http = require('http');
 const mongoose = require('mongoose');

 mongoose.connect("mongodb+srv://OmotoshoJoseph:jnXzXDwshPE9Nk2d@cluster0.xnocl.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected to db successfully");
});

 /**
  * Get port from environment and store in Express.
  */
 
 const port = normalizePort(process.env.PORT || '3005');
 app.set('port', port);
 
 /**
  * Create HTTP server.
  */
 
 const server = http.createServer(app);
 
 /**
  * Listen on provided port, on all network interfaces.
  */
 
 server.listen(port);
 server.on('error', onError);
 server.on('listening', onListening);
 
 /**
  * Normalize a port into a number, string, or false.
  */
 
 function normalizePort(val) {
   const portNumber = parseInt(val, 10);
 
   if (isNaN(portNumber)) {
     // named pipe
     return val;
   }
 
   if (portNumber >= 0) {
     // port number
     return portNumber;
   }
 
   return false;
 }
 
 /**
  * Event listener for HTTP server "error" event.
  */
 
 function onError(error) {
   if (error.syscall !== 'listen') {
     throw error;
   }
 
   const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
 
   // handle specific listen errors with friendly messages
   switch (error.code) {
     case 'EACCES':
       console.error(bind + ' requires elevated privileges');
       process.exit(1);
       break;
     case 'EADDRINUSE':
       console.error(bind + ' is already in use');
       process.exit(1);
       break;
     default:
       throw error;
   }
 }
 
 /**
  * Event listener for HTTP server "listening" event.
  */
 
 function onListening() {
   const addr = server.address();
   const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
   debug('Listening on ' + bind);
   console.log("listening on" + bind)
 }
 