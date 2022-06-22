import { Request } from "express";
import { Business, Collaborators, Transactions } from "../entities";
import { transactionRepository } from "../repositories";

import { AppDataSource } from "../data-source";

class TransactionService {
  create = async (datas: Partial<Transactions>, user: Business | Collaborators) => {
      const repositoryTransactions = AppDataSource.getRepository(Transactions);
      const repositoryCollaborators = AppDataSource.getRepository(Collaborators);

      if(user instanceof Business){
        const transaction = await repositoryTransactions.save({ ...datas, busine: user });

        return transaction;
      }

      if(user instanceof Collaborators){
        const collaboratorDb = await repositoryCollaborators.createQueryBuilder("collaborators")
            .innerJoinAndSelect("collaborators.busine", "business").where({ collaboratorId: user.collaboratorId }).getOne();
        const transaction = await repositoryTransactions.save({ ...datas, busine: collaboratorDb.busine, collaborator: user });

        return transaction;
      }
  };

  listAll = async (datas: Partial<Transactions>, user: Business | Collaborators) => {
    const repositoryCollaborators = AppDataSource.getRepository(Collaborators);
    const repositoryBusiness = AppDataSource.getRepository(Business);

    if(user instanceof Business){
      const businessDb = await repositoryBusiness.createQueryBuilder("business")
            .innerJoinAndSelect("business.transactions", "transactions").where({ busineId: user.busineId }).getOne();
      
      return businessDb.transactions;
    }
    if(user instanceof Collaborators){
      const collaboratorDb = await repositoryCollaborators.createQueryBuilder("collaborators")
            .innerJoinAndSelect("collaborators.busine", "business").where({ collaboratorId: user.collaboratorId }).getOne();

      return collaboratorDb.transactions;
    }
  };

  listOne = async ({ params }: Request) => {
    const transactionOne = await transactionRepository.findOne({
      transactionId: params.id,
    });
  };

  delete = async ({ params }: Request) => {
    const transactionDeleted = await transactionRepository.delete(params.id);
  };
}

export default new TransactionService();
