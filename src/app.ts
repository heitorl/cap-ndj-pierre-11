import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";

import Routers from "./routes";
import { errorHandler } from "./errors";


const app = express();
app.use(express.json());
app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
    console.log("err");
    return errorHandler(err, res);
});
Routers(app);

export default app;
