import { Request, Response } from "express";
import { Business } from "../entities";
import { DatabaseError } from "pg";

import { BusinessService } from "../services";
import { RemovePassword } from "../utils";

class BusinessController {
  login = async (req: Request, res: Response) => {
    const token = await BusinessService.login(
      req.validatedBusiness as Business
    );

    res.send({ token });
  };

  register = async (req: Request, res: Response) => {
    try {
      const business = await BusinessService.register(req.validatedBusiness);

      res.status(201).send({ business });
    } catch (err) {
      if (err instanceof DatabaseError) {
        return res.status(409).send({ error: err.detail });
      }
      res.status(400).send({ error: (err as Error).message });
    }
  };
  update = async (req: Request, res: Response) => {
    try {
      const business = await BusinessService.update(
        req.businessToken.busineId,
        req.validatedBusiness
      );

      res.send({ business });
    } catch (err) {
      if (err instanceof DatabaseError) {
        return res.status(409).send({ error: err.detail });
      }
      res.status(400).send({ error: (err as Error).message });
    }
  };
  read = (req: Request, res: Response) => {
    res.send({ business: RemovePassword(req.businessToken) });
  };
}

export default new BusinessController();
