import { Request, Response } from "express";
import { Business } from "../entities";

import { BusinessService } from "../services";

class BusinessController {
  login = async (req: Request, res: Response) => {
    const token = await BusinessService.login(
      req.validatedBusiness as Business
    );

    res.send({ token });
  };
}

export default new BusinessController();
