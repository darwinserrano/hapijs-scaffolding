/// <reference path="../typings/index.d.ts" />

import * as Hapi from "hapi";
import { boostrap } from "./boostrap";

const server = new Hapi.Server();
server.connection({
  port: 3000
});

server.route({
  method: "GET",
  path: "/",
  config: { auth: false },
  handler: (request: Hapi.Request, reply: Hapi.IReply) => {
    reply("Welcome to API");
  }
});

const startServer = () => {
  server.start(err => {
    if (err) throw err;
    console.log(`Server Start at ${server.info.uri}`);
  });
}

server.register(boostrap, err => {
  if (err) throw err;
  startServer();
});