import { Router } from "express";
import { discountController } from "../controllers";

const discountRouter = Router();

discountRouter.post("/", discountController.create);
discountRouter.get("/", discountController.listAll);
discountRouter.get("/:id", discountController.listOne);
discountRouter.patch("/:id", discountController.update);
discountRouter.delete("/:id", discountController.delete);

export default discountRouter;
