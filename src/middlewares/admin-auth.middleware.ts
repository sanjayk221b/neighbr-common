import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../utils/error-handler"; 

declare global {
  namespace Express {
    interface Request {
      adminId?: string;
    }
  }
}

const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.cookies && req.cookies["neighbr-admin-token"]) {
    token = req.cookies["neighbr-admin-token"];
  }

  if (!token) {
    return next(new UnauthorizedError("Not authorized, no token"));
  }

  if (!process.env.JWT_SECRET) {
    return next(new UnauthorizedError("JWT_SECRET is not defined."));
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded?.id;

    if (!req.adminId) {
      return next(new UnauthorizedError("Not authorized, admin not found"));
    }

    next();
  } catch (error) {
    return next(new UnauthorizedError("Not authorized, invalid token"));
  }
};

export { adminAuth };
