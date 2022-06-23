import { Request, Response } from "express";
import { Collaborators, Payments } from "../entities";
import { paymentService } from "../services";
import { RemovePassword } from "../utils";

class PaymentController {
  createPayment = async (req: Request, res: Response) => {
    const payment = await paymentService.createPayment(req.validatedDatas as Payments, req.transaction, req.UserToken);
    payment.collaborator = RemovePassword(payment.collaborator) as Collaborators;

    return res.status(201).json({ payment });
  };
}

export default new PaymentController();
