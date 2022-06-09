import { Express } from "express";

import BusinessRoute from "./business.route";


const Routers = (app: Express): void => {
    app.use("/business", BusinessRoute);
};


export default Routers;
