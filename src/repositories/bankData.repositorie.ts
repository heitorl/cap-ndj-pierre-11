import { Repository } from "typeorm";
import AppDataSource from "../data-source";
import { bankData } from "../entities";

interface IBankDataRepo {
  save: (data: Partial<bankData>) => Promise<bankData>;
  all: () => Promise<bankData[]>;
  findOne: (payload: object) => Promise<bankData>;
}

class BankDataRepo implements IBankDataRepo {
  private repo: Repository<bankData>;

  constructor() {
    this.repo = AppDataSource.getRepository(bankData);
  }

  save = async (data: Partial<bankData>) => await this.repo.save(data);

  all = async () => await this.repo.find();

  findOne = async (payload: object) => {
    return await this.repo.findOneBy({ ...payload });
  };
}

export default new BankDataRepo();
