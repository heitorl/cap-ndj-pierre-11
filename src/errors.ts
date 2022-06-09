import { Response } from "express";
import { ValidationError } from "yup";


class ErrorHandler{
    statusCode: number;
    messages: string | object;

    constructor(message: string | object, statusCode: number = 400){
        this.statusCode = statusCode;
        this.messages = message;
    }
}

const errorHandler = (err: Error, res: Response) => {
    if(err instanceof ErrorHandler){
        return res.status(err.statusCode).send({ "error": err.messages });
    }
    if(err instanceof ValidationError){
        return res.status(400).send({ "error": err.errors });
    }

    res.status(400).send(err);
};


export {
    ErrorHandler,
    errorHandler,
};
