import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../utils/error-handler";

declare global {
  namespace Express {
    interface Request {
      residentId?: string;
    }
  }
}

const residentAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;

  if (req.cookies && req.cookies["neighbr-resident-token"]) {
    token = req.cookies["neighbr-resident-token"];
  }

  if (!token) {
    return next(new UnauthorizedError("Not authorized, no token"));
  }

  if (!process.env.JWT_SECRET) {
    return next(new UnauthorizedError("JWT_SECRET is not defined."));
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    req.residentId = decoded?.id;

    if (!req.residentId) {
      return next(new UnauthorizedError("Not authorized, resident not found"));
    }

    next();
  } catch (error) {
    return next(new UnauthorizedError("Not authorized, invalid token"));
  }
};

export { residentAuth };
