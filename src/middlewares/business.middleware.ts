import { Request, Response, NextFunction } from "express";
import { Business } from "../entities";

import { BusinessService } from "../services";

class BusinessMiddleware {
  verifyCredentials = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (
      !(await BusinessService.verifyLogin(req.validatedBusiness as Business))
    ) {
      return res.status(401).send({ error: "email or password is invalid" });
    }

    next();
  };
}

export default new BusinessMiddleware();
