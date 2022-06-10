import { Express } from "express";
import collaboratorRouter from "./collaborator.route";

import BusinessRoute from "./business.route";
import paymentRouter from "./payment.route";

const Routers = (app: Express): void => {
  app.use("/api/business", BusinessRoute);
  app.use("/api/collaborators", collaboratorRouter);
  app.use("/api/payments", paymentRouter);
};

export default Routers;
