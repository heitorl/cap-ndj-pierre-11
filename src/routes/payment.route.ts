import { Router } from "express";
import { paymentController } from "../controllers";

const paymentRouter = Router();

paymentRouter.post("/", paymentController.createPayment);
paymentRouter.get("/", paymentController.listAll);
paymentRouter.get("/:id", paymentController.listOne);
paymentRouter.patch("/:id", paymentController.update);
paymentRouter.delete("/:id", paymentController.delete);

export default paymentRouter;
