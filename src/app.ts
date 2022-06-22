import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import { errorHandler } from "./errors";
import swaggerUiExpress from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

import Routers from "./routes";

const app = express();
app.use(express.json());
app.use(
  "/api-documentation",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerDocument)
);

Routers(app);

app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
  return errorHandler(err, res);
});

export default app;
