import { Router } from "express";
import { collaboratorController } from "../controllers";
import {
  BusinessMiddleware,
  validatedSchema,
  verifyEmailExists,
  verifyToken,
} from "../middlewares";
import { createCollaboratorSchema, loginCollaboratorSchema } from "../schemas";

const collaboratorRouter = Router();

collaboratorRouter.post(
  "/register",
  validatedSchema(createCollaboratorSchema),
  verifyEmailExists,
  collaboratorController.createCollaborator
);

collaboratorRouter.post(
  "/login",
  validatedSchema(loginCollaboratorSchema),
  collaboratorController.loginCollaborator
);

collaboratorRouter.get("", collaboratorController.getAll);

collaboratorRouter.get("/:id", collaboratorController.retriveve);

collaboratorRouter.patch("/:id", collaboratorController.updated);

collaboratorRouter.get(
  "/teste",
  verifyToken,
  collaboratorController.testeController
);

export default collaboratorRouter;
