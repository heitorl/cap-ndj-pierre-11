import { Request } from "express";
import { Business, Collaborators, Transactions } from "../entities";
import { transactionRepository } from "../repositories";

import { AppDataSource } from "../data-source";

class TransactionService {
  create = async (datas: Partial<Transactions>, business: Business, collaborator: Collaborators) => {
      const repositoryTransactions = AppDataSource.getRepository(Transactions);

      const transaction = await repositoryTransactions.save({ ...datas, collaborator: collaborator, busine: business });

      return transaction;
  };

  listAll = async (datas: Partial<Transactions>, user: Business | Collaborators) => {
    const repository = AppDataSource.getRepository(Transactions);

    if(user instanceof Business){
      const transactions = await repository.createQueryBuilder("transactions").innerJoinAndSelect("transactions.busine", "business")
        .innerJoinAndSelect("transactions.collaborator", "collaborators").where({ busine: user }).getMany();
      
      return transactions;
    }
    if(user instanceof Collaborators){
      const transactions = await repository.createQueryBuilder("transactions").innerJoinAndSelect("transactions.busine", "business")
      .innerJoinAndSelect("transactions.collaborator", "collaborators").where({ busine: user.busine }).getMany();

      return transactions;
    }
  };

  delete = async (id: string) => {
    const repository = AppDataSource.getRepository(Transactions);
    await repository.delete(id);
  };


  readById = async (id: string, business: Business) => {
    const repository = AppDataSource.getRepository(Transactions);
    const transaction = await repository.createQueryBuilder("transactions").innerJoinAndSelect("transactions.busine", "business")
      .innerJoinAndSelect("transactions.collaborator", "collaborators").where({ transactionId: id, busine: business }).getOne();

    return transaction;
  };
}

export default new TransactionService();
