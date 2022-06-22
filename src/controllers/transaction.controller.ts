import { Request, Response } from "express";
import { Business, Collaborators, Transactions } from "../entities";
import { transactionsService } from "../services";

class TransactionController {
  create = async (req: Request, res: Response) => {
    const { busine, payment, ...transaction } = await transactionsService.create(req.validatedDatas as Transactions, req.UserToken);

    return res.status(201).json({ transaction });
  };

  listAll = async (req: Request, res: Response) => {
    const list = await transactionsService.listAll(req.validatedDatas as Transactions, req.UserToken);
    return res.json(list);
  };

  listOne = async (req: Request, res: Response) => {
    const payment = await transactionsService.listOne(req);
    return res.json(payment);
  };

  delete = async (req: Request, res: Response) => {
    const payment = await transactionsService.delete(req);
    return res.json(payment);
  };
}

export default new TransactionController();
