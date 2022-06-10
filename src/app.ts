import express from "express";
import bodyParser from "body-parser";
import { mountRoutes } from "./routes/index.js";

const app = express();

// middlewares
app.use(bodyParser.json())

// routes
mountRoutes(app);

export default app;