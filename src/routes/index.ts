import { Application } from "express";
import userRoutes from "./user.js";
import bookRoutes from "./book.js";


export const mountRoutes = (app: Application) => {
  app.use("/users", userRoutes);
  app.use("/books", bookRoutes);
}