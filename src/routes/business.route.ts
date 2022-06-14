import { Router } from "express";

import { BusinessController } from "../controllers";
import { BusinessMiddleware, validatedSchema } from "../middlewares";
import { LoginBusinessSchema, RegisterBusinessSchema } from "../schemas/business.schema";


const router = Router();
router.post(
    "/login",
    validatedSchema(LoginBusinessSchema),
    BusinessMiddleware.verifyCredentials,
    BusinessController.login,
);
router.post(
    "/register",
    validatedSchema(RegisterBusinessSchema),
    BusinessController.register,
);


export default router;
