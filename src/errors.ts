import { Response } from "express";
import { DatabaseError } from "pg";


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
  if(err instanceof DatabaseError){
    return res.status(409).json({ error: err.detail });
  }

  return res.status(500).json({ message: (err).stack });
};

export { ErrorHandler, errorHandler };
