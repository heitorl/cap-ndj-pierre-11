import { Router } from "express";
import { collaboratorController } from "../controllers";
import {
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

collaboratorRouter.get(
  "/all",
  verifyToken,
  collaboratorController.testeController
);

export default collaboratorRouter;
