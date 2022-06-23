import { DeleteResult, Repository, UpdateResult } from "typeorm";
import AppDataSource from "../data-source";
import { Transactions } from "../entities";

interface ITransactionRepo {
  save: (payment: Partial<Transactions>) => Promise<Transactions>;
  all: () => Promise<Transactions[]>;
  findOne: (payload: object) => Promise<Transactions>;
  update: (id: string, payload: Partial<Transactions>) => Promise<UpdateResult>;
  delete: (id: string) => Promise<DeleteResult>;
}

class TransactionRepo implements ITransactionRepo {
  private repo: Repository<Transactions>;

  constructor() {
    this.repo = AppDataSource.getRepository(Transactions);
  }

  save = async (transaction: Partial<Transactions>) =>
    await this.repo.save(transaction);

  all = async () => await this.repo.find();

  findOne = async (payload: object) => {
    return await this.repo.findOneBy({ ...payload });
  };

  update = async (id: string, payload: Partial<Transactions>) =>
    await this.repo.update(id, { ...payload });

  delete = async (id: string) => await this.repo.delete(id);
}

export default new TransactionRepo();
