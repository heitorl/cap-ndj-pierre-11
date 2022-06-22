import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import { errorHandler } from "./errors";

import Routers from "./routes";

const app = express();
app.use(express.json());
Routers(app);
// app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
//   return errorHandler(err, res);
// });

export default app;
