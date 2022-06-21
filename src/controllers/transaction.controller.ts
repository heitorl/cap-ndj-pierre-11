import { Request, Response } from "express";
import { transactionsService } from "../services";

class TransactionController {
  create = async (req: Request, res: Response) => {
    const created = await transactionsService.create(req);
    return res.status(201).json(created);
  };

  listAll = async (req: Request, res: Response) => {
    const list = await transactionsService.listAll();
    return res.status(201).json(list);
  };

  listOne = async (req: Request, res: Response) => {
    const payment = await transactionsService.listOne(req);
    return res.status(201).json(payment);
  };

  update = async (req: Request, res: Response) => {
    const payment = await transactionsService.update(req);
    return res.status(201).json(payment);
  };

  delete = async (req: Request, res: Response) => {
    const payment = await transactionsService.delete(req);
    return res.status(201).json(payment);
  };
}

export default new TransactionController();
