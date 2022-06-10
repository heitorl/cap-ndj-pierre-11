import { Router } from "express";

import { BusinessController } from "../controllers";
import { BusinessMiddleware, validatedSchema } from "../middlewares";
import { LoginBusinessSchema } from "../schemas/business.schema";


const router = Router();
router.post(
    "/login",
    validatedSchema(LoginBusinessSchema),
    BusinessMiddleware.verifyCredentials,
    BusinessController.login,
);


export default router;
