import { Router } from "express";
import bankDataController from "../controllers/bankData.controller";
import { validatedSchema, verifyToken } from "../middlewares";
import { createBankDatachema } from "../schemas/bankData.schema";

const bankDataRouter = Router();
bankDataRouter.post(
  "/register",
  validatedSchema(createBankDatachema),
  verifyToken,
  bankDataController.createBankData
);

export default bankDataRouter;
