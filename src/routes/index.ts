import { Express } from "express";
import collaboratorRouter from "./collaborator.route";

const Routers = (app: Express): void => {
  app.use("/api/collaborators", collaboratorRouter);
};

export default Routers;
