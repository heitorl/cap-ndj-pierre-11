import { Router } from "express";
import { transactionController } from "../controllers";

const transactionRouter = Router();

transactionRouter.post("/", transactionController.create);
transactionRouter.get("/", transactionController.listAll);
transactionRouter.get("/:id", transactionController.listOne);
transactionRouter.patch("/:id", transactionController.update);
transactionRouter.delete("/:id", transactionController.delete);

export default transactionRouter;
