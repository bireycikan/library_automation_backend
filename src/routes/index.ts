import { Application } from "express";
import user from "./user.js";


export const mountRoutes = (app: Application) => {
  app.use("/users", user);
}