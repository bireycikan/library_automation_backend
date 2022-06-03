import http from "http";
import bodyParser from "body-parser";
import express from "express";
const app = express();

import debug from "debug";
const serverDebug = debug("server")

// middlewares
app.use(bodyParser.json())


// connect to postgresql database
import db from "./db/postgresql/index.js";
db.connect();


// create server
const server = http.createServer(app);


// listen server
let PORT = process.env.NODE_ENV === "prod" ? 3000 : 8080;
server.listen(PORT, () => {
  serverDebug(`Server is listening on port ${PORT}`)
})