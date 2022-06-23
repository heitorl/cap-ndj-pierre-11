import { Express } from "express";
import collaboratorRouter from "./collaborator.route";
import BusinessRoute from "./business.route";
import paymentRouter from "./payment.route";
import bankDataRouter from "./bankData.route";
import transactionRouter from "./transaction.route";

const Routers = (app: Express): void => {
  app.use("/api/business", BusinessRoute);
  app.use("/api/collaborators", collaboratorRouter);
  app.use("/api/payments", paymentRouter);
  app.use("/api/bank", bankDataRouter);
  app.use("/api/transactions", transactionRouter);
};

export default Routers;
