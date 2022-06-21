import { Request, Response } from "express";
import { bankDataService } from "../services";

class BankDataController {
  createBankData = async (req: Request, res: Response) => {
    const data = await bankDataService.createBankData(req);

    return res.status(201).json(data);
  };
}

export default new BankDataController();
