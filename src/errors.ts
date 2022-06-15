import { Response } from "express";

type TMessage = string | Record<string, any>;

class ErrorHandler {
  public statusCode: number;
  public error: TMessage;

  constructor(statusCode: number, message: TMessage) {
    this.statusCode = statusCode;
    this.error = message;
  }
}

const errorHandler = (err: Error, res: Response) => {
  if (err instanceof ErrorHandler) {
    return res.status(err.statusCode).json({ error: err.error });
  }

  return res.status(500).json({ message: "Internal server error." });
};

export { ErrorHandler, errorHandler };
