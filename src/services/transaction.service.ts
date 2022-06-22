import { Request } from "express";
import { Transactions } from "../entities";
import { transactionRepository } from "../repositories";

class TransactionService {
  create = async ({ body }: Request) => {
    // const newTransaction: Partial<Transactions> = {
    //   value: body.value,
    //   description: body.description,
    //   type: body.type,
    //   collaborator: body.collaborator,
    //   dateDeadline: body.deadLine,
    //   dateEmission: new Date()
    // }
  };

  listAll = async () => {
    const transactionList = await transactionRepository.all();

    return transactionList;
  };

  listOne = async ({ params }: Request) => {
    const transactionOne = await transactionRepository.findOne({
      transactionId: params.id,
    });
  };

  update = async ({ body, params }: Request) => {
    const transactionUpdate = await transactionRepository.update(params.id, {
      ...body,
    });
  };

  delete = async ({ params }: Request) => {
    const transactionDeleted = await transactionRepository.delete(params.id);
  };
}

export default new TransactionService();
