import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../utils/error-handler";
import { statusCodes } from "../enums";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);

  if (err instanceof ErrorHandler) {
    // Custom error handling for instances of ErrorHandler
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  } else {
    // Default handling for all other errors
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: err.message || "Internal Server Error",
    });
  }
}
