import { Application } from "express";
import userRoute from "./user.js";
import bookRoute from "./book.js";


export const mountRoutes = (app: Application) => {
  app.use("/users", userRoute);
  app.use("/books", bookRoute);
}