import { Request, Response } from "express";
import { paymentService } from "../services";

class PaymentController {
  createPayment = async (req: Request, res: Response) => {
    const created = await paymentService.createPayment(req);
    return res.status(201).json(created);
  };

  listAll = async (req: Request, res: Response) => {
    const list = await paymentService.listAll(req);
    return res.status(201).json(list);
  };

  listOne = async (req: Request, res: Response) => {
    const payment = await paymentService.listOne(req);
    return res.status(201).json(payment);
  };

  update = async (req: Request, res: Response) => {
    const payment = await paymentService.update(req);
    return res.status(201).json(payment);
  };

  delete = async (req: Request, res: Response) => {
    const payment = await paymentService.delete(req);
    return res.status(201).json(payment);
  };
}

export default new PaymentController();
