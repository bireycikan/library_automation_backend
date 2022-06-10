import http from "http";
import bodyParser from "body-parser";
import express from "express";
const app = express();

import { serverDebug } from "./debug/serverDebug.js";

// middlewares
app.use(bodyParser.json())


// routes
import { mountRoutes } from "./routes/index.js";
mountRoutes(app);


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