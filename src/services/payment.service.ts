import { Request } from "express";

class PaymentService {
  createPayment = async ({ body }: Request) => {
    return "Basic create route";
  };

  listAll = async ({ body }: Request) => {
    return "Basic list all route";
  };

  listOne = async ({ body }: Request) => {
    return "Basic list one route";
  };

  update = async ({ body }: Request) => {
    return "Basic update route";
  };

  delete = async ({ body }: Request) => {
    return "Basic delete route";
  };
}

export default new PaymentService();
