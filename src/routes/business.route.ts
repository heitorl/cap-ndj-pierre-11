import { Router } from "express";

import { BusinessController } from "../controllers";
import { BusinessMiddleware, validatedSchema } from "../middlewares";
import { LoginBusinessSchema, RegisterBusinessSchema, UpdateBusinessSchema } from "../schemas";


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
router.patch(
    "/register/:id",
    BusinessMiddleware.verifyToken,
    validatedSchema(UpdateBusinessSchema),
    BusinessController.update,
);


export default router;
