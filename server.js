'use strict';
const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
  port: 3000
});

server.route({
  method: "GET",
  path: "/",
  handler: (request, reply) => {
    reply("Welcome to API");
  }
});

const startServer = () => {
  server.start(err => {
    if (err) throw err;
    console.log(`Server Start at ${server.info.uri}`);
  });
}

server.register([
  require('./src/boostrap')
], err => {
  if (err) throw err;
  startServer();
});