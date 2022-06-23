import { Request, Response, NextFunction } from "express";

import { transactionsService } from "../services";
import { ErrorHandler } from "../errors";
import { Business } from "../entities";


class TransactionsMiddleware {
    verifyTransactionsIfExist = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        const transaction = (req.UserToken)?
             await transactionsService.readById(id, (req.UserToken instanceof Business)? req.UserToken: req.UserToken.busine):
             await transactionsService.readById(id, req.businessToken);
        if(!transaction){
            throw new ErrorHandler(404, "Transaction not found");
        }

        req.transaction = transaction;
        next();
    };

    verifyTransactionsPaymentIfExist = async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        const transaction = (req.UserToken)?
             await transactionsService.readByIdPayments(id, (req.UserToken instanceof Business)? req.UserToken: req.UserToken.busine):
             await transactionsService.readByIdPayments(id, req.businessToken);
        if(transaction){
            throw new ErrorHandler(404, "the transaction is already paid");
        }

        next();
    }
};


export default new TransactionsMiddleware;