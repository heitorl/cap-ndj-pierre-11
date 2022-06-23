import { Request, Response } from "express";
import { Collaborators, Payments, Transactions } from "../entities";
import { paymentService } from "../services";
import { RemovePassword, RemoveUsers } from "../utils";

class PaymentController {
  createPayment = async (req: Request, res: Response) => {
    const payment = await paymentService.createPayment(req.validatedDatas as Payments, req.transaction, req.UserToken);
    if(payment.collaborator){
      payment.collaborator = RemovePassword(payment.collaborator) as Collaborators;
    }
    payment.transaction = RemoveUsers(payment.transaction) as Transactions;

    return res.status(201).json({ payment });
  };
}

export default new PaymentController();
