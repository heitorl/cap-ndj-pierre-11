import { Router } from "express";
import { transactionController } from "../controllers";
import { validatedSchema, validateToken, BusinessMiddleware, collaboratorMiddlewares } from "../middlewares";
import { TransactionMiddleware } from "../middlewares";
import { RegisterTransactionSchema } from "../schemas";

const transactionRouter = Router();

transactionRouter.post(
    "/:colaboratorId",
    BusinessMiddleware.verifyToken,
    collaboratorMiddlewares.verifyCollaboratorIfExist,
    validatedSchema(RegisterTransactionSchema),
    transactionController.create,
);
transactionRouter.get(
    "/",
    validateToken,
    transactionController.listAll,
);
transactionRouter.get(
    "/:id",
    validateToken,
    TransactionMiddleware.verifyTransactionsIfExist,
    transactionController.listOne,
);
transactionRouter.delete(
    "/:id",
    BusinessMiddleware.verifyToken,
    TransactionMiddleware.verifyTransactionsIfExist,
    transactionController.delete,
);

export default transactionRouter;
