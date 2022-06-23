import { Router } from "express";
import { transactionController } from "../controllers";
import { validatedSchema, validateToken, BusinessMiddleware, collaboratorMiddlewares, TransactionMiddleware } from "../middlewares";
import { RegisterTransactionSchema } from "../schemas";

const transactionRouter = Router();

transactionRouter.post(
    "/:id",
    BusinessMiddleware.verifyToken,
    validatedSchema(RegisterTransactionSchema),
    collaboratorMiddlewares.verifyCollaboratorIfExist,
    transactionController.create,
);
transactionRouter.get(
    "",
    validateToken,
    transactionController.listAll,
);
transactionRouter.get(
    "/payments",
    validateToken,
    transactionController.readsTransaction
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
