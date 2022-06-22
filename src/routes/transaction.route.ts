import { Router } from "express";
import { transactionController } from "../controllers";
import { validatedSchema, validateToken } from "../middlewares";
import { RegisterTransactionSchema } from "../schemas";

const transactionRouter = Router();

transactionRouter.post(
    "/",
    validateToken,
    validatedSchema(RegisterTransactionSchema),
    transactionController.create,
);
transactionRouter.get(
    "/",
    validateToken,
    validatedSchema(RegisterTransactionSchema),
    transactionController.listAll,
);
transactionRouter.get(
    "/:id",
    validateToken,
    validatedSchema(RegisterTransactionSchema),
    transactionController.listOne,
);
transactionRouter.delete("/:id", transactionController.delete);

export default transactionRouter;
