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
    res.status(err.statusCode).json({
      success: false,
      status: "error",
      message: err.message,
    });
  } else {
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      status: "error",
      message: err.message || "Internal Server Error",
    });
  }
}
