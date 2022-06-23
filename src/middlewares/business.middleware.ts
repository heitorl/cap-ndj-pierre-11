import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { BusinessService } from "../services";
import { Business } from "../entities";

class BusinessMiddleware {
  verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({ error: "not authorized" });
    }

    await verify(token, process.env.SECRET_KEY ?? "", async (err, decode) => {
      if (err) {
        return res.status(401).send({ error: err.message, name: err.name });
      }

      const business = await BusinessService.readByEmail(
        (decode as Business).email
      );
      if (!business) {
        return res.status(401).send({ error: "not authorized" });
      }

      req.businessToken = business;
      next();
    });
  };

  verifyCredentials = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!(await BusinessService.verifyLogin(req.validatedDatas as Business))) {
      return res.status(401).send({ error: "email or password is invalid" });
    }

    next();
  };
}

export default new BusinessMiddleware();
