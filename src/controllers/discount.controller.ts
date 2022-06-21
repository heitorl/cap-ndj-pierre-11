import { Request, Response } from "express";
import { discountsService } from "../services";

class DiscountController {
  create = async (req: Request, res: Response) => {
    const created = await discountsService.create(req);
    return res.status(201).json(created);
  };

  listAll = async (req: Request, res: Response) => {
    const list = await discountsService.listAll();
    return res.status(201).json(list);
  };

  listOne = async (req: Request, res: Response) => {
    const payment = await discountsService.listOne(req);
    return res.status(201).json(payment);
  };

  update = async (req: Request, res: Response) => {
    const payment = await discountsService.update(req);
    return res.status(201).json(payment);
  };

  delete = async (req: Request, res: Response) => {
    const payment = await discountsService.delete(req);
    return res.status(201).json(payment);
  };
}

export default new DiscountController();
