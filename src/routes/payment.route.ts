import { Router } from "express";
import { paymentController } from "../controllers";
import { validateToken, TransactionMiddleware , validatedSchema } from "../middlewares";
import { RegisterPaymentSchema } from "../schemas";

const paymentRouter = Router();


paymentRouter.post(
    "/:id",
    validateToken,
    validatedSchema(RegisterPaymentSchema),
    TransactionMiddleware.verifyTransactionsIfExist,
    paymentController.createPayment,
);


export default paymentRouter;
