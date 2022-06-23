import { Router } from "express";

import { BusinessController } from "../controllers";
import businessController from "../controllers/business.controller";
import { BusinessMiddleware, validatedSchema, collaboratorMiddlewares, validateToken } from "../middlewares";
import {
    LoginBusinessSchema, RegisterBusinessSchema, UpdateBusinessSchema, RegisterCollaboratorSchema,
} from "../schemas";


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
    "",
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
    "/collaborators/:id",
    BusinessMiddleware.verifyToken,
    validatedSchema(RegisterCollaboratorSchema),
    collaboratorMiddlewares.verifyCollaboratorIfExist,
    BusinessController.registerCollaborator,
);
router.patch(
    "/collaborators/:id",
    BusinessMiddleware.verifyToken,
    validatedSchema(RegisterCollaboratorSchema),
    collaboratorMiddlewares.verifyCollaboratorIfExist,
    BusinessController.updateCollaborator,
);
router.delete(
    "/collaborators/:id",
    BusinessMiddleware.verifyToken,
    collaboratorMiddlewares.verifyCollaboratorIfExist,
);
router.get(
    "/collaborators",
    BusinessMiddleware.verifyToken,
    businessController.readsCollaborators,
);
router.get(
    "/collaborators/:id",
    BusinessMiddleware.verifyToken,
    collaboratorMiddlewares.verifyCollaboratorIfExist,
    businessController.readCollaborator,
);


export default router;
