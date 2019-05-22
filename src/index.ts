//LOAD ENVIRONMENT VARS
require("dotenv").config();;

import http = require("http");
import App from "./app";

const { APP_PORT } = process.env;

const server = http.createServer(App);

server.listen(APP_PORT);

server.on("listening", (): void => {
  console.log(`API has been started in port ${APP_PORT}!`);
});

server.on("error", (error: NodeJS.ErrnoException): void => {
  console.log(error.message);
});
