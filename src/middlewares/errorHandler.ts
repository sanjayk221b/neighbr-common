import { Request, Response, NextFunction } from "express";
import { statusCodes } from "../enums/statusCodes";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);

  res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
}
