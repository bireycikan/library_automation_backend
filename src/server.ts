import http from "http";
import postgresDB from "./db/postgresql/index.js";
import app from "./app.js";
import { serverDebug } from "./debug/serverDebug.js";

// connect to postgresql database
postgresDB.connect();


// create server
const server = http.createServer(app);


// listen server
let PORT = process.env.NODE_ENV === "prod" ? 3000 : 8080;
server.listen(PORT, () => {
  serverDebug(`Server is listening on port ${PORT}`)
})