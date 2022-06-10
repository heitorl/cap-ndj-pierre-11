import { Express } from "express";
import collaboratorRouter from "./collaborator.route";

import BusinessRoute from "./business.route";


const Routers = (app: Express): void => {
    app.use("/api/business", BusinessRoute);
    app.use("/api/collaborators", collaboratorRouter);
};


export default Routers;
