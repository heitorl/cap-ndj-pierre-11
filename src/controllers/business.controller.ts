import { Request, Response } from "express";

import { BusinessService } from "../services";


class BusinessController {
    login = async (req: Request, res: Response) => {
        const token = await BusinessService.login(req.validatedBusiness);

        res.send({ token });
    };
}


export default new BusinessController;
