import { statusCodes } from "../enums";

export class ErrorHandler extends Error {
  private readonly _statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this._statusCode = statusCode;
  }
  get statusCode(): number {
    return this._statusCode;
  }
}

export class BadRequestError extends ErrorHandler {
  constructor(message: string = "Bad Request") {
    super(message, statusCodes.BAD_REQUEST);
  }
}

export class NotFoundError extends ErrorHandler {
  constructor(message: string = "Not Found") {
    super(message, statusCodes.NOT_FOUND);
  }
}

export class UnauthorizedError extends ErrorHandler {
  constructor(message: string = "Unauthorized") {
    super(message, statusCodes.UNAUTHORIZED);
  }
}

export class ForbiddenError extends ErrorHandler {
  constructor(message: string = "Forbidden") {
    super(message, statusCodes.FORBIDDEN);
  }
}

export class MethodNotAllowedError extends ErrorHandler {
  constructor(message: string = "Method Not Allowed") {
    super(message, statusCodes.METHOD_NOT_ALLOWED);
  }
}

export class NoContentError extends ErrorHandler {
  constructor(message: string = "No Content") {
    super(message, statusCodes.NO_CONTENT);
  }
}

export class AcceptedError extends ErrorHandler {
  constructor(message: string = "Accepted") {
    super(message, statusCodes.ACCEPTED);
  }
}
export class InternalServerError extends ErrorHandler {
  constructor(message: string = "Internal Server Error") {
    super(message, statusCodes.INTERNAL_SERVER_ERROR);
  }
}
