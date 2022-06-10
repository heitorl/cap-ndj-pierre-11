import { Router } from "express";
import { collaboratorController } from "../controllers";

const collaboratorRouter = Router();

collaboratorRouter.post("/register", collaboratorController.createCollaborator);

collaboratorRouter.post("/login", collaboratorController.loginCollaborator);

export default collaboratorRouter;
