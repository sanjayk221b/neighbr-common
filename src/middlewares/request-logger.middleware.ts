import { Request, Response, NextFunction } from "express";
import { logger } from "../lib";

const requestLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};

export default requestLoggerMiddleware;
