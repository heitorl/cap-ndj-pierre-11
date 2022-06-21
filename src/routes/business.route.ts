import { Router } from "express";

import { BusinessController } from "../controllers";
import businessController from "../controllers/business.controller";
import { BusinessMiddleware, validatedSchema, collaboratorMiddlewares } from "../middlewares";
import { LoginBusinessSchema, RegisterBusinessSchema, UpdateBusinessSchema, RegisterCollaboratorSchema } from "../schemas";


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
    "/register",
    BusinessMiddleware.verifyToken,
    validatedSchema(UpdateBusinessSchema),
    BusinessController.update,
);
router.get(
    "",
    BusinessMiddleware.verifyToken,
    BusinessController.read,
);
router.post(
    "/collaborator/:id",
    BusinessMiddleware.verifyToken,
    validatedSchema(RegisterCollaboratorSchema),
    collaboratorMiddlewares.verifyCollaboratorIfExist,
    BusinessController.registerCollaborator,
);
router.get(
    "/collaborator",
    BusinessMiddleware.verifyToken,
    businessController.readsCollaborators,
);
router.get(
    "/collaborator/:id",
    BusinessMiddleware.verifyToken,
    collaboratorMiddlewares.verifyCollaboratorIfExist,
    businessController.readCollaborator,
);


export default router;
