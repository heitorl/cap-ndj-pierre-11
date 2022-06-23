import { Request, Response } from "express";
import { Business, Collaborators, Transactions } from "../entities";
import { transactionsService } from "../services";
import { RemovePassword } from "../utils";

class TransactionController {
  create = async (req: Request, res: Response) => {
    const { busine, ...transaction } = await transactionsService
      .create(req.validatedDatas as Transactions, req.businessToken, req.collaborator);
    transaction.collaborator = RemovePassword(transaction.collaborator) as Collaborators;

    return res.status(201).json({ transaction });
  };

  listAll = async (req: Request, res: Response) => {
    const list = await transactionsService.listAll(req.validatedDatas as Transactions, req.UserToken);
    return res.json({ transactions: list.map(transaction => {
        const { busine, ...t } = transaction;
        t.collaborator = RemovePassword(t.collaborator) as Collaborators;
        return t;
    }) });
  };

  listOne = async (req: Request, res: Response) => {
    const { busine, ...transaction } = req.transaction;

    return res.json({ transaction });
  };

  delete = async (req: Request, res: Response) => {
    await transactionsService.delete(req.transaction.transactionId);

    return res.json({});
  };
}

export default new TransactionController();
