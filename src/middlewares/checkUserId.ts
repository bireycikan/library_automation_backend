import { Request, Response, NextFunction } from "express";

export const checkUserID = function (req: Request, res: Response, next: NextFunction) {

  const userID = req.params.id;
  let errorMessage;

  if (userID) {
    if (Number.isNaN(+userID)) {
      errorMessage = "user id must be a number";
    }
    else if (+userID <= 0) {
      errorMessage = "user id must be positive number";
    }
    else if (!Number.isInteger(+userID)) {
      errorMessage = "user id must be an integer";
    }
  }

  if (errorMessage) {
    return res.status(400).json({ message: errorMessage })
  }

  next();
}