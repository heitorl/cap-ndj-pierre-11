import { DeleteResult, Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../data-source";
import { Discounts } from "../entities";

interface IDiscountRepo {
  save: (payment: Partial<Discounts>) => Promise<Discounts>;
  all: () => Promise<Discounts[]>;
  findOne: (payload: object) => Promise<Discounts>;
  update: (id: string, payload: Partial<Discounts>) => Promise<UpdateResult>;
  delete: (id: string) => Promise<DeleteResult>;
}

class DiscountRepo implements IDiscountRepo {
  private repo: Repository<Discounts>;

  constructor() {
    this.repo = AppDataSource.getRepository(Discounts);
  }

  save = async (discount: Partial<Discounts>) => await this.repo.save(discount);

  all = async () => await this.repo.find();

  findOne = async (payload: object) => {
    return await this.repo.findOneBy({ ...payload });
  };

  update = async (id: string, payload: Partial<Discounts>) =>
    await this.repo.update(id, { ...payload });

  delete = async (id: string) => await this.repo.delete(id);
}

export default new DiscountRepo();
